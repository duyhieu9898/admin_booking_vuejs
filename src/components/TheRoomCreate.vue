<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Add New Details</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home"></i>&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right"></i>
          </li>
          <li>
            <router-link :to="{ name: 'list-room'}" class="title">
              Room&nbsp;
              <i class="fa fa-angle-right"></i>
            </router-link>
          </li>
          <li class="active">Add New Room</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-head">
            <header>Add New Room</header>
            <div class="col-lg-10">
              <div class="pull-right">
                <a @click="$router.go(-1)" class="btn btn-primary">Back</a>
              </div>
            </div>
            <div class="mdl-menu__container is-upgraded">
              <div class="mdl-menu__outline mdl-menu--bottom-right"></div>
              <ul
                class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                data-mdl-for="panel-button"
                data-upgraded=",MaterialMenu,MaterialRipple"
              >
                <li
                  class="mdl-menu__item mdl-js-ripple-effect"
                  tabindex="-1"
                  data-upgraded=",MaterialRipple"
                >
                  <i class="material-icons">assistant_photo</i>Action
                  <span class="mdl-menu__item-ripple-container">
                    <span class="mdl-ripple"></span>
                  </span>
                </li>
                <li
                  class="mdl-menu__item mdl-js-ripple-effect"
                  tabindex="-1"
                  data-upgraded=",MaterialRipple"
                >
                  <i class="material-icons">print</i>Another action
                  <span class="mdl-menu__item-ripple-container">
                    <span class="mdl-ripple"></span>
                  </span>
                </li>
                <li
                  class="mdl-menu__item mdl-js-ripple-effect"
                  tabindex="-1"
                  data-upgraded=",MaterialRipple"
                >
                  <i class="material-icons">favorite</i>Something else here
                  <span class="mdl-menu__item-ripple-container">
                    <span class="mdl-ripple"></span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="col-lg-12 p-t-20">
              <div class="card-box">
                <div class="card-header">Room Infomation</div>
                <div class="card-body">
                  <div class="row">
                    <div class="col-lg-6 p-t-20">
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-dirty is-upgraded"
                        data-upgraded=",MaterialTextfield"
                        style="width: 124px;"
                      >
                        <select
                          v-validate="{ required: true, regex: /\d/ }"
                          name="category"
                          v-model="room.category_id"
                          class="mdl-textfield__input category-room"
                        >
                          <option hidden>Chose type of the room</option>
                          <option
                            v-for="category in list_categories"
                            :key="category.id"
                            :value="category.id"
                          >{{ category.name }}</option>
                        </select>
                        <label for="category-room" class="pull-right margin-0">
                          <i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i>
                        </label>
                        <label for="category-room" class="mdl-textfield__label">Room Type</label>

                        <span
                          v-show="errors.has('category')"
                          class="errors"
                        >{{ errors.first('category') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-dirty is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <input
                          v-validate="'required|min:6|max:96'"
                          name="title"
                          type="text"
                          class="mdl-textfield__input"
                          v-model.trim="room.title"
                          placeholder="Enter title of the room"
                        />
                        <label class="mdl-textfield__label">Room Title</label>
                        <span
                          v-show="errors.has('title')"
                          class="errors"
                        >{{ errors.first('title') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-dirty is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <money
                          v-validate="'min_value:10'"
                          name="area"
                          v-model="room.room_area"
                          v-bind="size"
                          class="mdl-textfield__input"
                          maxlength="6"
                        ></money>
                        <label class="mdl-textfield__label">Room Area</label>
                        <span v-show="errors.has('area')" class="errors">{{ errors.first('area') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-dirty is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <money
                          v-validate="'min_value:1'"
                          name="people"
                          v-model="room.maximum_peoples_number"
                          v-bind="people"
                          class="mdl-textfield__input"
                          maxlength="15"
                        ></money>
                        <label class="mdl-textfield__label">Room People</label>
                        <span
                          v-show="errors.has('people')"
                          class="errors"
                        >{{ errors.first('people') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <div
                        class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label txt-full-width is-dirty is-upgraded"
                        data-upgraded=",MaterialTextfield"
                      >
                        <!-- <input type="number"  v-model.lazy="dataRoomEdit.price" > -->
                        <money
                          v-validate="'max_value:99999999'"
                          name="price"
                          v-model="room.price"
                          v-bind="money"
                          class="mdl-textfield__input"
                          maxlength="14"
                        ></money>
                        <label class="mdl-textfield__label">Room Price</label>
                        <span
                          v-show="errors.has('price')"
                          class="errors"
                        >{{ errors.first('price') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <!--emit address id -->
                      <room-address-component @address-id="getAddressId"></room-address-component>
                      <input
                        type="hidden"
                        v-validate="'required'"
                        name="address_room"
                        v-model="room.address_id"
                      />
                      <span
                        v-show="errors.has('address_room')"
                        class="errors"
                        style="margin-top: -20px;display: inherit;"
                      >{{ errors.first('address_room') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <div class="card-box">
                <div class="card-header">Room Description</div>
                <ckeditor :editor="editor" v-model.trim="room.description" :config="editorConfig"></ckeditor>

                <input
                  type="hidden"
                  v-validate="'required|min:50|max:1000'"
                  name="description"
                  v-model="room.description"
                />
                <span
                  v-show="errors.has('description')"
                  class="errors"
                >{{ errors.first('description') }}</span>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <div class="card-box">
                <div class="card-header">Room Police And Term</div>

                <ckeditor
                  :editor="editor"
                  v-model.lazy.trim="room.police_and_terms"
                  :config="editorConfig"
                ></ckeditor>
                <input
                  type="hidden"
                  v-validate="'required|min:50|max:1000'"
                  name="police_and_terms"
                  v-model="room.police_and_terms"
                />
                <span
                  v-show="errors.has('police_and_terms')"
                  class="errors"
                >{{ errors.first('police_and_terms') }}</span>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <div class="card-box txt-full-width is-dirty is-upgraded">
                <div class="card-header">Room Convenients</div>
                <div class="card-body">
                  <div class="row">
                    <room-convenients-component
                      :convenients="list_convenients"
                      @arr-convenients-id="getArrConvenientsId"
                    ></room-convenients-component>
                    <input
                      type="hidden"
                      v-validate="'required'"
                      name="convenient_room"
                      v-model="list_convenients"
                    />
                    <span
                      v-show="errors.has('convenient_room')"
                      class="errors"
                    >{{ errors.first('convenient_room') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <room-photo-component @arr-images-id="getArrImagesId"></room-photo-component>
              <input
                type="hidden"
                v-validate="'required'"
                name="photo_room"
                v-model="room.list_images_id"
              />
              <span
                v-show="errors.has('photo_room')"
                class="errors"
              >{{ errors.first('photo_room') }}</span>
            </div>
            <div class="col-lg-12 p-t-20 text-center">
              <button
                @click="createRoom()"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 m-r-20 btn-pink"
              >
                Create
                <span class="mdl-button__ripple-container">
                  <span class="mdl-ripple"></span>
                </span>
              </button>
              <button
                @click="resetForm"
                type="button"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-warning"
              >
                Reset
                <span class="mdl-button__ripple-container">
                  <span class="mdl-ripple"></span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "insertTable"
        ]
      },
      list_categories: [],
      list_convenients: [],
      room: {
        category_id: "Chose type of the room",
        address_id: null,
        title: null,
        room_area: 0,
        maximum_peoples_number: 1,
        price: 0,
        description: null,
        police_and_terms: null,
        address_id: null,
        list_convenients_id: [],
        list_images_id: []
      },
      money: {
        decimal: ",",
        thousands: ",",
        suffix: " VNĐ",
        precision: 0,
        masked: false
      },
      size: {
        decimal: ",",
        thousands: ",",
        precision: 0,
        suffix: " M",
        masked: false
      },
      people: {
        decimal: ",",
        thousands: ",",
        precision: 0,
        suffix: " Pleople/Room",
        masked: false
      }
    };
  },
  created() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      this.axios
        .get("/api/rooms/create")
        .then(res => {
          this.list_categories = res.data.categories;
          this.list_convenients = res.data.convenients;
        })
        .catch(err => {
          console.log(err.response.data);
        });
    },
    getArrConvenientsId(arrConvenientsId) {
      this.room.list_convenients_id = arrConvenientsId;
    },
    getAddressId(addressId) {
      this.room.address_id = addressId;
    },
    getArrImagesId(arrImagesId) {
      this.room.list_images_id = arrImagesId;
    },
    async createRoom() {
      await this.$validator.validate();
      if (this.errors.any()) {
        alertify.notify("You must fix all errors in the form ", "error", 7);
        return;
      }
      try {
        await this.axios.post("/api/rooms/", {
          category_id: this.room.category_id,
          address_id: this.room.address_id,
          title: this.room.title,
          description: this.room.description,
          room_area: this.room.room_area,
          maximum_peoples_number: this.room.maximum_peoples_number,
          police_and_terms: this.room.police_and_terms,
          list_convenients_id: this.room.list_convenients_id,
          list_images_id: this.room.list_images_id,
          price: this.room.price
        });
        alertify.notify("CREATE room success", "success", 7);
        this.resetForm();
      } catch (error) {
        console.log(error.response.data);
      }
    },
    resetForm() {
      this.$validator.reset();
      this.room = {
        category_id: "Chose type of the room",
        address_id: null,
        title: null,
        room_area: 0,
        maximum_peoples_number: 1,
        price: 0,
        description: null,
        police_and_terms: null,
        address_id: null,
        list_convenients_id: [],
        list_images_id: []
      };
    }
  }
};
</script>
<style>
@import "../../static/plugins/dropzone/dropzone.css";
.image-room {
  border-radius: 5px;
  overflow: hidden;
  height: 242px;
  position: relative;
  border: 2px solid #c7b78c;
}

.image-room img {
  max-width: 100%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
