export const state = () => ({
  modals: {
    navbar: false,
    cart: false,
  },

  links: [
    { id: 1, name: 'Меню', link: 'menu' },
    { id: 2, name: 'Доставка', link: 'delivery' },
    { id: 3, name: 'Акции', link: 'stock' },
    { id: 4, name: 'Отзывы', link: 'reviews' },
    { id: 5, name: 'Конткты', link: 'contacts' },
  ],

  subLinks: [
    { id: 1, name: 'Роллы', link: 'roll' },
    { id: 2, name: 'Суши и гунканы', link: 'susi' },
    { id: 3, name: 'Сеты', link: 'sets' },
    { id: 4, name: 'Лапша и рис', link: 'noodles' },
    { id: 5, name: 'Салаты', link: 'salads' },
    { id: 6, name: 'Горячие блюда', link: 'hot' },
  ],

  products: [
    {
      id: 1,
      image: '1_.png',
      title: 'ролл ясай',
      weight: 185,
      price: 200,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 2,
      image: '2_.png',
      title: 'Мясные роллы',
      weight: 260,
      price: 240,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 3,
      image: '3_.png',
      title: 'ролл лайт',
      weight: 190,
      price: 165,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 4,
      image: '4_.png',
      title: 'ролл веган',
      weight: 230,
      price: 210,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 5,
      image: '5_.png',
      title: 'ролл чиро',
      weight: 185,
      price: 215,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 6,
      image: '6_.png',
      title: 'ролл тайол',
      weight: 210,
      price: 130,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 7,
      image: '7_.png',
      title: 'ролл Батакон',
      weight: 215,
      price: 185,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 8,
      image: '5_.png',
      title: 'ролл калипсо',
      weight: 220,
      price: 165,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 9,
      image: '6_.png',
      title: 'ролл кавьяр',
      weight: 195,
      price: 200,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 10,
      image: '1_.png',
      title: 'ролл чипу',
      weight: 185,
      price: 220,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 11,
      image: '2_.png',
      title: 'ролл катана',
      weight: 190,
      price: 215,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
    {
      id: 12,
      image: '3_.png',
      title: 'ролл мишику',
      weight: 240,
      price: 260,
      desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
    },
  ],

  user: {
    favorites: [1, 3, 6, 7, 11],
    cart: [
      {
        cnt: 2,
        id: 1,
        image: '1_.png',
        title: 'ролл ясай',
        weight: 185,
        price: 200,
        desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
      },
      {
        cnt: 1,
        id: 4,
        image: '4_.png',
        title: 'ролл веган',
        weight: 230,
        price: 210,
        desc: 'Огурец, авокадо, помидор, болгарский перец, листья салата, кунжут',
      },
    ],
  },
})

export const getters = {
  GET_NAVBAR(state) {
    return state.modals.navbar
  },
  GET_SUM_CART(state) {
    return state.user.cart.reduce((acc, item) => {
      return acc + item.price * item.cnt
    }, 0)
  },
}

export const mutations = {
  SET_MODAL_CART(state, close = false) {
    state.modals.cart = !state.modals.cart
    if (close) {
      state.modals.cart = false
    }
    // FIXME: Придумать другое решение со скролом в корзине
    if (state.modals.cart) {
      document.querySelector('body').style.overflowY = 'hidden'
    } else {
      document.querySelector('body').style.overflowY = 'auto'
    }
  },
  SET_MODAL_NAVBAR(state, close = false) {
    state.modals.navbar = !state.modals.navbar
    if (close) {
      state.modals.navbar = false
    }
  },
  SET_FAVORITES(state, id) {
    if (state.user.favorites.includes(id)) {
      state.user.favorites = state.user.favorites.filter((i) => i !== id)
    } else {
      state.user.favorites.push(id)
    }
  },
  ADD_TO_CART(state, id) {
    const item = state.user.cart.find((i) => i.id === id)
    if (item?.cnt) ++item.cnt
    if (item === undefined) {
      state.user.cart.push({
        ...state.products.find((i) => i.id === id),
        cnt: 1,
      })
    }
  },
  REMOVE_FROM_CART(state, id) {
    const item = state.user.cart.find((i) => i.id === id)
    if (item?.cnt > 0) --item.cnt
    if (item.cnt === 0) {
      state.user.cart = state.user.cart.filter((i) => i.id !== id)
    }
  },
  REMOVE_ALL_FROM_CART(state, id) {
    state.user.cart = state.user.cart.filter((i) => i.id !== id)
  },
}
