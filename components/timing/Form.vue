<template>
  <v-form ref="Form" @submit.prevent="() => {}">
    <v-subheader>
      New laptime
    </v-subheader>

    <v-row class="px-4">
      <!-- Laptime -->
      <v-col cols="12">
        <v-text-field
          v-model.number="form.laptime"
          type="number"
          label="Laptime (sec) *"
          outlined
          dense
          persistent-placeholder
          placeholder="123,1234"
          hide-details="auto"
          :min="0.0000"
          :error-messages="laptimeErrors"
          @change="() => $v.form.laptime.$touch()"
        />
      </v-col>

      <!-- User -->
      <v-col cols="12">
        <v-select
          v-model="form.userId"
          :items="userOptions"
          outlined
          dense
          hide-selected
          clearable
          persistent-placeholder
          label="User *"
          hide-details="auto"
          :error-messages="userIdErrors"
          @change="() => $v.form.userId.$touch()"
        />
      </v-col>

      <!-- Submit -->
      <v-col cols="12">
        <v-btn
          type="submit"
          small
          depressed
          color="primary"
          :loading="loading"
          :disabled="$v.$invalid"
          @click.stop="onSubmit"
        >
          Submit
        </v-btn>
      </v-col>

      <v-col v-if="error" cols="12">
        <small class="error--text" v-text="error" />
      </v-col>

      <v-col v-if="success" cols="12">
        <small class="success--text" v-text="success" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { required } from 'vuelidate/lib/validators'
import { IForm, ITiming, IUser, TUserList } from '~/types'

export default defineComponent({
  name: 'TimingForm',
  props: {
    timing: {
      type: Object as PropType<ITiming>,
      default: undefined,
    },
  },
  validations: {
    form: {
      laptime: {
        required,
      },
      userId: {
        required,
      },
      datetime: {
        required,
      },
    },
  },
  data: () => ({
    error: undefined as string | undefined,
    success: undefined as string | undefined,
    form: {
      id: undefined,
      laptime: undefined,
      userId: undefined,
      datetime: undefined,
    } as IForm,
  }),
  computed: {
    loading(): boolean {
      return this.$store.state.loading
    },
    users(): TUserList {
      return this.$store.state.users.users
    },
    userOptions(): Array<{ text: string, value: IUser['id'] }> {
      // Map text and value properties or users for use in v-select
      return this.users.map((user: IUser) => {
        let fullname = user.first_name

        if (user.last_name_prefix)
          fullname = `${fullname} ${user.last_name_prefix}`

        fullname = `${fullname} ${user.last_name}`

        return {
          text: fullname,
          value: user.id,
        }
      })
    },
    laptimeErrors() {
      // Error messages for laptime input
      const errors: Array<string> = []

      if (!this.$v.form.laptime?.$dirty) return errors

      !this.$v.form.laptime?.required && errors.push('Laptime is required.')

      return errors
    },
    userIdErrors() {
      // Error messages for user input
      const errors: Array<string> = []

      if (!this.$v.form.userId?.$dirty) return errors

      !this.$v.form.userId?.required && errors.push('User is required.')

      return errors
    },
  },
  async beforeMount() {
    await this.$store.dispatch('users/fetchUsers')
  },
  mounted() {
    // Init form for edition
    this.form = { ...this.form, ...this.timing }

    // Set time to now if we're creating a new timing
    if (!this.timing)
      this.form.datetime = new Date().toISOString()
  },
  methods: {
    resetForm() {      
      this.error = undefined
      this.success = undefined

      this.form = {
        id: undefined,
        laptime: undefined,
        userId: undefined,
      }

      this.$v.$reset()
    },
    async onSubmit() {
      // Unset error and success messages
      this.error = undefined
      this.success = undefined

      // If invalid, do nothing
      if (this.$v.$invalid) return

      // Prepare the payload
      const payload: IForm = { ...this.form }

      // Set time to now if we're creating a new timing
      if (!this.timing)
        payload.datetime = new Date().toISOString()

      // Are we updating or adding a timing?
      const promise = this.timing ? 'timings/updateTiming' : 'timings/addTiming'

      // Add/update
      try {
        await this.$store.dispatch(promise, payload)
        this.success = 'Success!'
        return true
      } catch (error) {
        this.error = error.message
        return false
      }
    },
  },
})
</script>
