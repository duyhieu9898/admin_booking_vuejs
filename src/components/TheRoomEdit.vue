<template>
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class="pull-left">
          <div class="page-title">Edit Room Details</div>
        </div>
        <ol class="breadcrumb page-breadcrumb pull-right">
          <li>
            <i class="fa fa-home" />&nbsp;
            <router-link :to="{ name: 'dash-board'}" class="title">Home</router-link>&nbsp;
            <i class="fa fa-angle-right" />
          </li>
          <li>
            <router-link :to="{ name: 'list-room'}" class="title">Room&nbsp;</router-link>
            <i class="fa fa-angle-right" />
          </li>
          <li class="active">Edit Room Details</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-head">
            <header>Room No {{ room.id }}</header>
            <div class="col-lg-10">
              <div class="pull-right">
                <a class="btn btn-primary" @click="$router.go(-1)">Back</a>
              </div>
            </div>
            <div class="mdl-menu__container is-upgraded">
              <div class="mdl-menu__outline mdl-menu--bottom-right" />
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
                    <span class="mdl-ripple" />
                  </span>
                </li>
                <li
                  class="mdl-menu__item mdl-js-ripple-effect"
                  tabindex="-1"
                  data-upgraded=",MaterialRipple"
                >
                  <i class="material-icons">print</i>Another action
                  <span class="mdl-menu__item-ripple-container">
                    <span class="mdl-ripple" />
                  </span>
                </li>
                <li
                  class="mdl-menu__item mdl-js-ripple-effect"
                  tabindex="-1"
                  data-upgraded=",MaterialRipple"
                >
                  <i class="material-icons">favorite</i>Something else here
                  <span class="mdl-menu__item-ripple-container">
                    <span class="mdl-ripple" />
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="card-body">
            <div class="col-lg-12 p-t-20">
              <div class="card card-box">
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
                          v-model="room.category_id"
                          v-validate="{ required: true, regex: /\d/ }"
                          name="category"
                          class="mdl-textfield__input category-room"
                        >
                          <option
                            v-for="category in categories"
                            :key="category.id"
                            :value="category.id"
                            :checked="category.id == room.category_id"
                          >
                            {{ category.name }}
                          </option>
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
                          v-model.trim="room.title"
                          v-validate="'required|min:6|max:96'"
                          name="title"
                          type="text"
                          class="mdl-textfield__input"
                        >
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
                        <!-- <input type="number" class="mdl-textfield__input"  v-model.number="dataRoomEdit.area"> -->
                        <money
                          v-model="room.room_area"
                          v-validate="'min_value:10'"
                          name="area"
                          v-bind="size"
                          class="mdl-textfield__input"
                          maxlength="6"
                        />
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
                          v-model="room.maximum_peoples_number"
                          v-validate="'min_value:1'"
                          name="people"
                          v-bind="people"
                          class="mdl-textfield__input"
                          maxlength="15"
                        />
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
                          v-model="room.price"
                          v-validate="'max_value:99999999'"
                          name="price"
                          v-bind="money"
                          class="mdl-textfield__input"
                          maxlength="15"
                        />
                        <label class="mdl-textfield__label">Room Price</label>
                        <span
                          v-show="errors.has('price')"
                          class="errors"
                        >{{ errors.first('price') }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6 p-t-20">
                      <room-address :address-id="room.address_id" />
                      <input
                        v-model="room.address_id"
                        v-validate="'required'"
                        type="hidden"
                        name="address_room"
                      >
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

                <ckeditor
                  v-model.lazy.trim="room.description"
                  :editor="editor"
                  :config="editorConfig"
                />
                <input
                  v-model="room.description"
                  v-validate="'required|min:50|max:1000'"
                  type="hidden"
                  name="description"
                >
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
                  v-model.lazy.trim="room.police_and_terms"
                  :editor="editor"
                  :config="editorConfig"
                />
                <input
                  v-model="room.police_and_terms"
                  v-validate="'required|min:50|max:1000'"
                  type="hidden"
                  name="police_and_terms"
                >
                <span
                  v-show="errors.has('police_and_terms')"
                  class="errors"
                >{{ errors.first('police_and_terms') }}</span>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <div class="card-box txt-full-width is-dirty is-upgraded">
                <div class="card-header">Room Conveniences</div>
                <div class="card-body">
                  <div class="row">
                    <room-conveniences
                      :conveniences="conveniences"
                      :conveniences-room="list_conveniences_id"
                      @arr-conveniences-id="getArrConvenientId"
                    />
                    <input
                      v-model="list_conveniences_id"
                      v-validate="'required'"
                      type="hidden"
                      name="convenient_room"
                    >
                    <span
                      v-show="errors.has('convenient_room')"
                      class="errors"
                    >{{ errors.first('convenient_room') }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-12 p-t-20">
              <room-photo :room-id="room.id" />
            </div>
            <div class="col-lg-12 p-t-20 text-center">
              <button
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 m-r-20 btn-pink"
                @click="updateRoom()"
              >
                SAVE
                <span class="mdl-button__ripple-container">
                  <span class="mdl-ripple" />
                </span>
              </button>
              <button
                type="button"
                class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect m-b-10 btn-default"
                @click="resetForm"
              >
                RESET
                <span class="mdl-button__ripple-container">
                  <span class="mdl-ripple" />
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
/* global alertify */
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import roomPhoto from '@/components/commons/RoomPhoto'
import roomConveniences from '@/components/commons/RoomConveniences'
import roomAddress from '@/components/commons/RoomAddress'
import apiUrl from '@/constants/apiUrl'

export default {
  components: {
    roomPhoto,
    roomConveniences,
    roomAddress
  },
  data () {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'insertTable'
        ]
      },
      categories: [],
      conveniences: [],
      list_conveniences_id: [],
      room: {
        id: 0,
        address_id: 0,
        category_id: 0,
        description: '',
        maximum_peoples_number: 0,
        police_and_terms: '',
        price: 0,
        room_area: 0,
        title: '',
        list_conveniences_id: []
      },
      money: {
        decimal: ',',
        thousands: ',',
        suffix: ' VNĐ',
        precision: 0,
        masked: false
      },
      size: {
        decimal: ',',
        thousands: ',',
        precision: 0,
        suffix: ' M',
        masked: false
      },
      people: {
        decimal: ',',
        thousands: ',',
        precision: 0,
        suffix: ' Pleople/Room',
        masked: false
      }
    }
  },
  created () {
    this.room.id = parseInt(this.$route.params.id)
    this.getRoom()
  },
  methods: {
    async getRoom (roomId) {
      try {
        const { data } = await this.axios.get(apiUrl.GET_DATA_EDIT_ROOM_BY_ID.replace(':id', this.room.id))

        this.room = data.room
        this.categories = data.categories
        this.list_conveniences_id = data.arrListConveniencesId
        this.conveniences = data.conveniences
      } catch (error) {
        console.error(error.response.data)
      }
    },
    //! listen event emit
    getArrConvenientId (arrConveniences) {
      this.list_conveniences_id = arrConveniences
    },
    async updateRoom () {
      await this.$validator.validate()
      if (this.errors.any()) {
        alertify.notify('You must fix all errors in the form ', 'error', 7)
        return
      }
      try {
        await this.axios.put(apiUrl.UPDATE_ROOM_BY_ID.replace(':id', this.room.id), {
          category_id: this.room.category_id,
          title: this.room.title,
          price: this.room.price,
          room_area: this.room.room_area,
          maximum_peoples_number: this.room.maximum_peoples_number,
          police_and_terms: this.room.police_and_terms,
          description: this.room.description,
          list_conveniences_id: this.list_conveniences_id
        })
        alertify.notify('UPDATE room success', 'success', 7)
      } catch (error) {
        console.log(error.response.data)
      }
    },
    resetForm () {
      this.$validator.reset()
      this.getRoom()
    }
  }
}
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
