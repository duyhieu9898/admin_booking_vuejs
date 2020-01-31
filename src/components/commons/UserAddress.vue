<template>
  <div>
    <input
      v-if="isEdit"
      v-model="currentAddress"
      class="info__address form-control"
      placeholder="Enter address of the room"
      readonly
      data-toggle="modal"
      data-target="#adddress--model__edit"
    >
    <p v-else>{{ currentAddress }}</p>
    <div
      id="adddress--model__edit"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-md" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="modalTitle" class="modal-title">Adress Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-lg-offset-2 col-lg-8 form-group">
                <input
                  v-model="address.street"
                  class="form-control"
                  type="text"
                  placeholder="enter Street"
                >
                <div v-if="errorsCustom.address.street != null" class="errorsCustom">
                  <span>{{ errorsCustom.address.street }}</span>
                </div>
              </div>
              <div class="col-lg-offset-2 col-lg-8 form-group">
                <select v-model="address.province" class="form-control">
                  <option hidden>Chose Province</option>
                  <option
                    v-for="province in list_provinces"
                    :key="province.id"
                    :value="{ id: province.id, name: province.name }"
                  >
                    {{ province.name }}
                  </option>
                </select>
                <div v-if="errorsCustom.address.province != null" class="errorsCustom">
                  <span>{{ errorsCustom.address.province }}</span>
                </div>
              </div>
              <div class="col-lg-offset-2 col-lg-8 form-group">
                <select v-model="address.district" class="form-control">
                  <option hidden>Chose District</option>
                  <option
                    v-for="district in list_districts"
                    :key="district.id"
                    :value="{ id: district.id, name: district.name }"
                  >
                    {{ district.name }}
                  </option>
                </select>
                <div v-if="errorsCustom.address.district != null" class="errorsCustom">
                  <span>{{ errorsCustom.address.district }}</span>
                </div>
              </div>
              <div class="col-lg-offset-2 col-lg-8 form-group">
                <select v-model="address.ward" class="form-control">
                  <option hidden>Chose Ward</option>
                  <option
                    v-for="ward in list_wards"
                    :key="ward.id"
                    :value="{ id: ward.id, name: ward.name}"
                  >
                    {{ ward.name }}
                  </option>
                </select>
                <div v-if="errorsCustom.address.ward != null" class="errorsCustom">
                  <span>{{ errorsCustom.address.ward }}</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">CLOSE</button>
                <button type="button" class="btn btn-primary" @click="saveAddress()">SAVE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global alertify, $ */
export default {
  name: 'UserAddress',
  props: {
    userId: {
      type: Number,
      required: true
    },
    addressId: {
      type: Number,
      required: true
    },
    isEdit: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      address: {
        street: '',
        ward: 'Chose Ward',
        district: 'Chose District',
        province: 'Chose Province'
      },
      currentAddress: '',
      list_provinces: [],
      list_districts: [],
      list_wards: [],
      errorsCustom: {
        address: {
          street: null,
          ward: null,
          district: null,
          province: null
        }
      }
    }
  },
  computed: {
    getProvince () {
      return this.address.province
    },
    getDistrict () {
      return this.address.district
    },
    getWard () {
      return this.address.ward
    },
    getStreet () {
      return this.address.street
    }
  },
  watch: {
    getProvince () {
      if (this.address.province !== 'Chose Province') {
        this.errorsCustom.address.province = null
        this.getListDistrictsByProvince(this.address.province.id)
        // reset value select default
        this.address.district = 'Chose District'
      }
    },
    getDistrict () {
      if (this.address.district !== 'Chose Province') {
        this.errorsCustom.address.district = null
        this.getListWardsByDistrict(this.address.district.id)
        // reset value select default
        this.address.ward = 'Chose Ward'
      }
    },
    getWard () {
      if (this.address.ward !== 'Chose Ward') {
        this.errorsCustom.address.ward = null
      }
    },
    getStreet () {
      if (this.address.street !== 'Chose Province') {
        this.errorsCustom.address.street = null
      }
    },
    addressId: {
      handler: function () {
        this.getAddressOfUser()
        console.log('reload bind data getAddressOfUser')
      }
    }
  },
  created () {
    this.getListProvinces()
  },
  methods: {
    getAddressOfUser () {
      this.axios
        .get('/api/address/' + this.addressId)
        .then(res => {
          var address = res.data.address
          this.currentAddress = `${address.street}, ${address.ward} - ${address.district} - ${address.province}`
        })
        .catch(err => {
          console.error(err)
        })
    },
    saveAddress () {
      if (this.checkAddress()) {
        try {
          if (this.currentAddress !== '') {
            this.updateAddress()
          } else {
            this.createAddress()
          }
          const currentAddress = `${this.address.street} - ${this.address.ward.name}, ${this.address.district.name}, ${this.address.province.name}`
          this.currentAddress = currentAddress
          $('#adddress--model__edit').modal('hide')
          alertify.notify('UPDATE user address success', 'success', 7)
        } catch (error) {
          alertify.notify('There was an unexpected error', 'error', 7)
        }
      }
    },
    createAddress () {
      this.axios
        .post('/api/addresses/create', {
          street: this.address.street,
          ward: this.address.ward.id,
          district: this.address.district.id,
          province: this.address.province.id
        })
        .then(res => {
          // return id address
          console.log(res.data.message)
          this.$emit('address-id', res.data.addressId)
        })
        .catch(err => {
          throw err.response.data
        })
    },
    updateAddress () {
      this.axios
        .put('/api/address/' + this.userId, {
          street: this.address.street,
          ward: this.address.ward.id,
          district: this.address.district.id,
          province: this.address.province.id
        })
        .then(res => {
          console.log(res.data.message)
        })
        .catch(err => {
          throw err.response.data
        })
    },
    getListWardsByDistrict (disttictId) {
      this.axios
        .get('/api/wards/' + disttictId)
        .then(res => {
          this.list_wards = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    getListDistrictsByProvince (provinceId) {
      this.axios
        .get('/api/districts/' + provinceId)
        .then(res => {
          this.list_districts = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    getListProvinces () {
      this.axios
        .get('/api/provinces')
        .then(res => {
          this.list_provinces = res.data
        })
        .catch(err => {
          console.error(err)
        })
    },
    checkAddress () {
      // reset error
      this.errorsCustom.address.street = null
      this.errorsCustom.address.ward = null
      this.errorsCustom.address.district = null
      this.errorsCustom.address.province = null
      if (this.address.street === '') {
        this.errorsCustom.address.street = 'Please enter Street.'
      }
      if (this.address.ward === 'Chose Ward') {
        this.errorsCustom.address.ward = 'Please choose Ward'
      }
      if (this.address.district === 'Chose District') {
        this.errorsCustom.address.district = 'Please choose District.'
      }
      if (this.address.province === 'Chose Province') {
        this.errorsCustom.address.province = 'Please choose Province.'
      }
      if (
        this.errorsCustom.address.street === null &&
        this.errorsCustom.address.province === null &&
        this.errorsCustom.address.district === null &&
        this.errorsCustom.address.ward === null
      ) {
        return true
      }
      return false
    }
  }
}
</script>
<style>
.errorsCustom span {
  color: red;
}
</style>
