<template>
  <div>
    <b-form-group>
      <b-form-checkbox-group
        id="checkbox-conveniences"
        v-model="arr_conveniences_id"
        :options="options"
      />
    </b-form-group>
    <div>
      Selected:
      <strong>{{ arr_conveniences_id }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RoomConveniences',
  props: {
    conveniences: {
      required: true,
      type: Array
    },
    conveniencesRoom: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
      arr_conveniences_id: [], // Must be an array reference!
      options: []
    }
  },
  watch: {
    arr_conveniences_id: {
      handler: function () {
        this.$emit('arr-conveniences-id', this.arr_conveniences_id)
      }
    },
    conveniences: {
      handler: function () {
        this.arrOptionConvenient(this.conveniences)
        if (this.conveniencesRoom) {
          this.arr_conveniences_id = this.conveniencesRoom
        }
      }
    }
  },
  methods: {
    arrOptionConvenient (conveniences) {
      var arrOptionCustom = conveniences.map(
        (convenient, index, conveniences) => {
          return { text: convenient.name, value: convenient.id }
        }
      )
      this.options = arrOptionCustom
    }
  }
}
</script>
<style lang="css">
#checkbox-conveniences > .custom-checkbox {
  margin-top: 6px;
  margin-left: 0px;
  min-width: 30%;
}
</style>
