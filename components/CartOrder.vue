<template>
  <div class="mx-auto max-w-[540px]">
    <form class="flex flex-col" @submit.prevent="submitForm">
      <div class="rounded-lg bg-white p-4 xs:px-2">
        <div class="flex">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#D34A44] text-white"
          >
            1
          </div>
          <div class="ml-3 text-[22px]">Способ доставки</div>
        </div>

        <div
          v-for="item of delivery"
          :key="item.id"
          class="radio mb-3 ml-12 flex h-8 flex-col xs:ml-4"
        >
          <input
            :id="`radio-${item.id}`"
            name="radio"
            type="radio"
            :checked="item.value"
            :disabled="!item.enable"
            @change="changeDelivery(item.id)"
          />

          <label
            :for="`radio-${item.id}`"
            class="radio-label relative my-4 flex w-full cursor-pointer items-center"
          >
            <div class="flex w-full items-center justify-between">
              <div
                class="flex w-1/2 items-center"
                :class="{ 'opacity-60': !item.enable }"
              >
                <IconCarDelivery
                  v-if="item.id === 1"
                  class="ml-5 mr-10 xs:mr-4"
                />
                <IconShoppingBag
                  v-if="item.id === 2"
                  class="ml-5 mr-10 xs:mr-4"
                />
                <span class="text-lg">{{ item.name }}</span>
              </div>

              <div
                v-if="item.enable && item.discount !== ''"
                class="w-1/2 font-bold leading-3 text-[#3F4871]"
              >
                Скидка -{{ item.discount }}%
                <div class="text-xs">на стоиомость покупки</div>
              </div>
              <div v-else class="w-1/2 text-red-500">Временно недоступно</div>
            </div>
          </label>
        </div>
      </div>

      <div class="mt-3 rounded-lg bg-white p-4 xs:px-2">
        <div class="flex">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full bg-[#D34A44] text-white"
          >
            2
          </div>
          <div class="ml-3 text-[22px]">Данные для доставки</div>
        </div>

        <div class="form ml-12 mt-8 flex flex-col">
          <label class="mb-10 block">
            <IconUserFull />
            <input
              id="name"
              v-model.trim="form.name"
              type="text"
              placeholder="Имя"
              class="mt-0 block w-full border-0 border-b-2 border-gray-200 p-0.5 focus:border-black focus:ring-0"
              :class="{ 'border-red-500': v$.form.name.$error }"
            />
          </label>
          <span
            v-if="v$.form.name.$error"
            class="-mt-9 mb-5 text-xs text-red-500"
            >{{ v$.form.name.$errors[0].$message }}</span
          >

          <label for="phone" class="mb-10 block">
            <IconPhoneFull />
            <input
              id="phone"
              v-model.trim="form.phone"
              v-mask="'+7 (###) ###-##-##'"
              type="tel"
              placeholder="Номер телефона"
              class="mt-0 block w-full border-0 border-b-2 border-gray-200 p-0.5 focus:border-black focus:ring-0"
              :class="{ 'border-red-500': v$.form.phone.$error }"
            />
          </label>
          <span
            v-if="v$.form.phone.$error"
            class="-mt-9 mb-5 text-xs text-red-500"
            >{{ v$.form.phone.$errors[0].$message }}</span
          >

          <label for="comment" class="mb-10 block">
            <IconAddInform />
            <input
              id="comment"
              v-model.trim="form.comment"
              type="text"
              placeholder="Дополнительная информация"
              class="mt-0 block w-full border-0 border-b-2 border-gray-200 p-0.5 focus:border-black focus:ring-0"
            />
          </label>
        </div>
      </div>

      <div class="my-3 rounded-lg bg-white p-4 xs:px-2">
        <div class="ml-12 flex flex-col divide-y-2 text-lg">
          <div class="flex p-5">
            <span class="w-1/2 font-light">Cтоимость товаров:</span>
            <span>{{ sum }} ₽</span>
          </div>
          <div class="flex p-5">
            <span class="w-1/2 font-light">Итого к оплате:</span>
            <span>{{ sumViaDiscount }} ₽</span>
          </div>
        </div>

        <button
          class="w-full rounded-md bg-[#0C334A] py-2 text-center text-lg text-white"
        >
          Купить и оплатить
        </button>

        <div class="my-5 text-xs">
          Создавая заказ, вы соглашаетесь с
          <NuxtLink class="text-[#185598]" to="#"
            >политикой обработки персональных данных</NuxtLink
          >
        </div>
      </div>
    </form>

    <div class="mb-3 flex justify-around sm:hidden">
      <button
        class="shadow-item rounded-lg bg-white px-6 py-4 xs:px-2 xs:py-1"
        @click="close"
      >
        Вернуться к покупкам
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mask } from 'vue-the-mask'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength, maxLength } from '@vuelidate/validators'

// это правило срабатывать не будет, т.к. идёт проверка в mask
const zoneRU = (value) => value.includes('+7')

export default {
  directives: { mask },

  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      delivery: [
        {
          id: 1,
          name: 'Курьер',
          enable: false,
          discount: '',
          value: false,
        },
        {
          id: 2,
          name: 'Самовывоз',
          enable: true,
          discount: 10,
          value: true,
        },
      ],
      form: {
        name: '',
        phone: '',
        comment: '',
        id_delivery: 2,
      },
    }
  },

  computed: {
    ...mapGetters({ sum: 'GET_SUM_CART' }),

    sumViaDiscount() {
      return (
        this.sum *
        ((100 -
          this.delivery.filter((i) => i.id === this.form.id_delivery)[0]
            ?.discount) /
          100)
      ).toFixed(2)
    },
  },

  validations() {
    return {
      form: {
        name: {
          required: helpers.withMessage('Обязательно укажите имя', required),
          minLengthValue: helpers.withMessage(
            ({ $params }) =>
              `Имя должно содержать минимум ${$params.min} символа`,
            minLength(3),
          ),
        },
        phone: {
          required: helpers.withMessage(
            'Обязательно укажите номер телефона',
            required,
          ),
          minLengthValue: helpers.withMessage(
            ({ $params }) =>
              `Телефон должно содержать минимум ${$params.min - 7} цифр`,
            minLength(18),
          ),
          maxLengthValue: helpers.withMessage(
            ({ $params }) =>
              `Телефон должно содержать максимум ${$params.max - 7} цифр`,
            maxLength(18),
          ),
          zone: helpers.withMessage(
            'Поддерживаются только номера телефонов из РФ',
            zoneRU,
          ),
        },
      },
    }
  },

  methods: {
    close() {
      this.$store.commit('SET_MODAL_CART', true)
      this.$store.commit('SET_MODAL_CHECKOUT', true)
    },
    changeDelivery(id) {
      this.form.id_delivery = id

      this.delivery.forEach((item) => {
        item.id === id && item.enable
          ? (item.value = true)
          : (item.value = false)
      })
    },

    submitForm() {
      this.v$.$validate()
      if (this.v$.$error) return false

      // тут реализуем метод покупки
    },
  },
}
</script>

<style lang="scss" scoped>
.form {
  label {
    position: relative;
    svg {
      position: absolute;
      left: 6px;
      bottom: 10px;
    }
  }
  input {
    text-indent: 45px;
  }
}

.radio {
  input[type='radio'] {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        // content: '✓';
        // content: '✔';
        content: '';
        border-radius: 50%;
        border: 1px solid #a5a5a5;
        display: inline-block;
        width: 32px;
        min-width: 32px;
        height: 32px;
        min-height: 32px;
        position: relative;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 200ms ease;
      }
      &::after {
        content: '';
        position: absolute;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          border: 1px solid #0acf83;
          background-color: #0acf83;
        }
      }
      + .radio-label {
        &::after {
          content: '✓';
          top: 4px;
          left: 10px;
          color: #fff;
        }
      }
    }
    // &:focus {
    //   + .radio-label {
    //     &:before {
    //       outline: none;
    //       border-color: #0acf83;
    //     }
    //   }
    // }
    // &:disabled {
    //   + .radio-label {
    //     &:before {
    //       box-shadow: inset 0 0 0 4px #f4f4f4;
    //       border-color: darken(#f4f4f4, 25%);
    //       background: darken(#f4f4f4, 25%);
    //     }
    //   }
    // }
    // + .radio-label {
    //   &:empty {
    //     &:before {
    //       margin-right: 0;
    //     }
    //   }
    // }
  }
}
</style>
