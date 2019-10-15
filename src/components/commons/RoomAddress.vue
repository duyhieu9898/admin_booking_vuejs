<template>
  <div
    class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select getmdl-select__fix-height txt-full-width is-dirty is-upgraded"
    data-upgraded=",MaterialTextfield"
    style="width: 124px;"
  >
    <input
      class="info__address width-ellipsis mdl-textfield__input"
      v-model="currentAddress"
      placeholder="Enter address of the room"
      readonly
      data-toggle="modal"
      data-target="#adddress--model__edit"
    />
    <div
      class="modal fade"
      id="adddress--model__edit"
      tabindex="-1"
      role="dialog"
      aria-labelledby="modalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitle">Adress Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row justify-content-center">
              <div class="col-8 form-group">
                <input
                  class="form-control"
                  type="text"
                  v-model="address.street"
                  placeholder="enter Street"
                />
                <div class="customErrors" v-if="customErrors.address.street != null">
                  <p>{{ customErrors.address.street }}</p>
                </div>
              </div>
              <div class="col-8 form-group">
                <select class="form-control" v-model="address.province">
                  <option hidden>Chose Province</option>
                  <option
                    v-bind:value="{ id: province.id, name: province.name }"
                    v-for="province in provinces"
                    :key="province.id"
                  >{{ province.name }}</option>
                </select>
                <div class="customErrors" v-if="customErrors.address.province != null">
                  <p>{{ customErrors.address.province }}</p>
                </div>
              </div>
              <div class="col-8 form-group">
                <select class="form-control" v-model="address.district" ref="slelect-district">
                  <option hidden>Chose District</option>
                  <option
                    v-bind:value="{ id: district.id, name: district.name }"
                    v-for="district in districts"
                    :key="district.id"
                  >{{ district.name }}</option>
                </select>
                <div class="customErrors" v-if="customErrors.address.district != null">
                  <p>{{ customErrors.address.district }}</p>
                </div>
              </div>
              <div class="col-8 form-group">
                <select class="form-control" v-model="address.ward" ref="slelect-ward">
                  <option hidden>Chose Ward</option>
                  <option
                    v-bind:value="{ id: ward.id, name: ward.name}"
                    v-for="ward in wards"
                    :key="ward.id"
                  >{{ ward.name }}</option>
                </select>
                <div class="customErrors" v-if="customErrors.address.ward != null">
                  <p>{{ customErrors.address.ward }}</p>
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
    <label class="mdl-textfield__label">Address</label>
  </div>
</template>

<script>
import apiUrl from "../../constants/apiUrl"

export default {
  name: "room-address",
  props: {
    address_id: {
      type: Number
    }
  },
  data() {
    return {
      address: {
        street: "",
        ward: "Chose Ward",
        district: "Chose District",
        province: "Chose Province"
      },
      currentAddress: "",
      provinces: [],
      districts: [],
      wards: [],
      customErrors: {
        address: {
          street: null,
          ward: null,
          district: null,
          province: null
        }
      }
    }
  },
  created() {
    this.getListProvinces()
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs['slelect-district'].disabled = true
      this.$refs['slelect-ward'].disabled = true
    })
  },
  methods: {
    async getAddressById() {
      try {
        const response = await this.axios.get(apiUrl.GET_ADDRESS_BY_ID.replace(":id", this.address_id))
        var address = response.data.address
        this.currentAddress = `${address.street}, ${address.ward} - ${address.district} - ${address.province}`
      } catch (error) {
        console.error(error)
      }
    },
    saveAddress() {
      if (this.checkAddress()) {
        try {
          if (this.address_id) {
            this.updateAddress()
          } else {
            this.createAddress()
          }
          this.currentAddress = `${this.address.street} - ${this.address.ward.name}, ${this.address.district.name}, ${this.address.province.name}`
          $("#adddress--model__edit").modal("hide")
          alertify.notify("Update room address success", "success", 7)
        } catch (error) {
          alertify.notify("There was an unexpected error", "error", 7)
        }
      }
    },
    async createAddress() {
      try {
        const response = await this.axios.post(apiUrl.CREATE_ADDRESS, {
          street: this.address.street,
          ward: this.address.ward.id,
          district: this.address.district.id,
          province: this.address.province.id
        })
        this.$emit("address-id", response.data.address_id)
      } catch (error) {
        throw err.response
      }
    },
   updateAddress() {
      try {
        this.axios.put(apiUrl.UPDATE_ADDRESS_BY_ID.replace(":id", this.address_id), {
            street: this.address.street,
            ward: this.address.ward.id,
            district: this.address.district.id,
            province: this.address.province.id
          }
        )
      } catch (error) {
        throw err.response
      }
    },
    async getListWardsByDistrict(disttictId) {
      try {
        const { data } = await this.axios.get(apiUrl.GET_WARDS_BY_DISTRICT_ID.replace(":id", disttictId))
        this.wards = data
        this.$refs['slelect-ward'].disabled = false
      } catch (error) {
        console.error(error)
      }
    },
    async getListDistrictsByProvince(provinceId) {
      try {
        const { data } = await this.axios.get(apiUrl.GET_DISTRICTS_BY_PROVINCE_ID.replace(":id", provinceId))
        this.districts = data
        this.$refs['slelect-district'].disabled = false
      } catch (error) {
        console.error(error)
      }
    },
    async getListProvinces() {
      try {
        const { data } = await this.axios.get(apiUrl.GET_PROVINCES)
        this.provinces = data
      } catch (error) {
        console.error(error)
      }
    },
    checkAddress() {
      //reset error
      this.customErrors.address.street = null
      this.customErrors.address.ward = null
      this.customErrors.address.district = null
      this.customErrors.address.province = null
      if (this.address.street === "") {
        this.customErrors.address.street = "Please enter Street."
      }
      if (this.address.ward === "Chose Ward") {
        this.customErrors.address.ward = "Please choose Ward"
      }
      if (this.address.district === "Chose District") {
        this.customErrors.address.district = "Please choose District."
      }
      if (this.address.province === "Chose Province") {
        this.customErrors.address.province = "Please choose Province."
      }
      if (
        this.customErrors.address.street === null &&
        this.customErrors.address.province === null &&
        this.customErrors.address.district === null &&
        this.customErrors.address.ward === null
      ) {
        return true
      }
      return false
    }
  },
  computed: {
    getProvince() {
      return this.address.province
    },
    getDistrict() {
      return this.address.district
    },
    getWard() {
      return this.address.ward
    },
    getStreet() {
      return this.address.street
    }
  },
  watch: {
    address_id() {
      this.getAddressById()
    },
    getProvince() {
      if (this.address.province !== "Chose Province") {
        this.customErrors.address.province = null
        this.getListDistrictsByProvince(this.address.province.id)
        //reset value select default
        this.address.district = "Chose District"
      }
    },
    getDistrict() {
      if (this.address.district !== "Chose Province") {
        this.customErrors.address.district = null
        this.getListWardsByDistrict(this.address.district.id)
        //reset value select default
        this.address.ward = "Chose Ward"
      }
    },
    getWard() {
      if (this.address.ward !== "Chose Ward") {
        this.customErrors.address.ward = null
      }
    },
    getStreet() {
      if (this.address.street !== "Chose Province") {
        this.customErrors.address.street = null
      }
    }
  }
}
</script>
