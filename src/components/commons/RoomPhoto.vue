<template>
  <div class="card-box photo-room txt-full-width is-dirty is-upgraded">
    <div class="card-header d-flex justify-content-between">
      <div class="card__header--photo">Room Photos</div>
      <div class="image__add">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#image--model__add"
        >Add Images</button>
        <!-- Modal -->
        <div
          class="modal fade"
          id="image--model__add"
          tabindex="-1"
          role="dialog"
          aria-labelledby="modalLongTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="modalTitle">Upload Room Photos</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="col-lg-12 p-t-20">
                  <div id="id_dropzone" class="d-flex justify-content-center dz-clickable">
                    <div class="dz-message">
                      <div class="dropIcon">
                        <i class="material-icons">cloud_upload</i>
                        <input type="file" multiple style="display:none" />
                      </div>
                      <h3>Drop files here or click to upload.</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">BACK</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body photo-view">
      <div class="row">
        <div
          class="col-sm-4 text-sm-center"
          v-for="(image, index) in list_images"
          v-bind:key="image.id"
        >
          <div class="image-room">
            <img :src="asset(image.file_name)" :alt="image.original_name" />
          </div>
          <a @click="deleteImage(image.id, index)" class="image--remove">Remove</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiUrl from '../../constants/apiUrl';
import { asset } from '@/utils/helper'

export default {
  name: 'RoomPhoto',
  props: {
    room_id: {
      type: Number
    }
  },
  data() {
    return {
      list_images: [],
      list_images_id: []
    };
  },
  created() {
    this.getListImages();
  },
  mounted() {
    let urlPathUpload;
    if (this.room_id) {
      urlPathUpload =`${apiUrl. GET_IMAGES_BY_ROOM_ID.replace(':id', this.room_id)}?api_token=${this.$token}`;
    } else {
      urlPathUpload = `${apiUrl.CREATE_IMAGE}?api_token=${this.$token}`
    }
    this.initDropzone(urlPathUpload)
  },
  methods: {
    getListImages() {
      if (this.room_id) {
        this.axios
          .get(apiUrl.GET_IMAGES_BY_ROOM_ID.replace(':id', this.room_id))
          .then(response => {
            this.list_images = response.data;
          })
          .catch(err => {
            console.error(err.response.data);
          });
      }
    },
    async deleteImage(imageId, index) {
      try {
        await this.axios.delete(apiUrl.DELETE_IMAGE_BY_ID.replace(':id', imageId))
        this.list_images.splice(index, 1);
      } catch (error) {
        console.log(error.response.data);
      }
    },
    initDropzone(urlPathUpload) {
      var vm = this;
      // default method post
      var myDropzone = new Dropzone("#id_dropzone", {
        url: urlPathUpload,
        parallelUploads: 100,
        maxFiles: 6,
        maxFilesize: 5,
        acceptedFiles: ".jpeg,.jpg,.png,.gif",
        dictRemoveFile: "Remove",
        dictFileTooBig: "Image is bigger than 5MB",
        paramName: "file",
        // The setting up of the dropzone
        error: function(file, response) {
          if ($.type(response) === "string") {
            //dropzone sends it's own error messages in string
            var message = response;
          } else {
            var message = response.message;
          }

          file.previewElement.classList.add("dz-error");
          var _ref = file.previewElement.querySelectorAll(
            "[data-dz-errormessage]"
          );
          var _results = [];

          for (let _i = 0, _len = _ref.length; _i < _len; _i++) {
            var node = _ref[_i];
            _results.push((node.textContent = message));
          }

          return _results;
        },
        success: function(file, response) {
          var html = `<div class="col-sm-4 text-sm-center " id="js-section-${response.image_id}">
                        <div class="image-room">
                            <img src="${file.dataURL}" alt="delete-booking.png">
                        </div>
                        <a class="js-remove-image image--remove" data-image-id="${response.image_id}">Remove</a>
                    </div>`;
          $(".photo-view > .row").append(html);

          $(".js-remove-image").click(function(e) {
            e.preventDefault();
            var imageId = e.target.dataset.imageId;
            $.ajax({
              type: "delete",
              url: vm.$host_name_server + "/api/images/" + imageId,
              headers: {
                Authorization: `Bearer ${vm.$token}`
              },
              success: function(res) {
                $("#js-section-" + imageId).remove();
                //console.log(res.message)
              },
              error: function(res) {
                //console.log(res.responseJSON);
              }
            });
          });

          vm.list_images_id.push(response.image_id);
          vm.$emit("arr-images-id", vm.list_images_id);
        }
      });
    },
    asset(fileName) {
      console.log(fileName);

      return asset(fileName)
    }
  }
};
</script>
<style>
.image--remove {
  color: #337ab7 !important;
}

.image--remove:hover {
  text-decoration: underline !important;
}

.card__header--photo .car-body {
  min-height: 150px;
}
undefined .photo-room .card-body {
  min-height: 150px;
}
.photo-view {
  min-height: 150px;
}
</style>
