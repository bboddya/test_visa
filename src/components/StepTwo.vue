<template>
  <div class="section">
    <div class="container">
      <h1>Шаг 2.</h1>
      <div class="user">
        <span class="user__name"
          >{{ name | nameFilter }} {{ surname | surnameFilter }}</span
        >
      </div>

      <form class="wrapper wrapper_row">
        <div class="form-group">
          <div class="form-group form-group__label">
            <label for="name">Имя</label>
          </div>
          <input
            class="form-control form-control__input"
            placeholder="Введите Имя"
            v-model="name"
            type="text"
            id="name"
          />
        </div>

        <div class="form-group">
          <div class="form-group form-group__label">
            <label for="surname">Фамилия</label>
          </div>
          <input
            class="form-control form-control__input"
            placeholder="Введите Фамилию"
            v-model="surname"
            type="text"
            id="surname"
          />
        </div>

        <div class="form-group">
          <div class="form-group form-group__label">
            <label for="birthday">Дата рождения</label>
          </div>
          <input
            class="form-control form-control__date"
            v-model="birthday"
            type="date"
            id="birthday"
          />
        </div>

        <div class="form-group">
          <div class="form-group form-group__label">
            <label for="nationality">Гражданство</label>
          </div>
          <div class="form-group__select">
            <select v-model="national" id="nationality" class="form-control">
              <option
                v-for="(nation, index) in nationality"
                :key="index"
                :value="nation.id"
              >
                {{ nation.name }}
              </option>
            </select>
          </div>
        </div>
      </form>

      <div class="wrapper wrapper__info wrapper__info_big">
        <div class="visa">Виза</div>
        <div class="info">
          <div>
            <div>Страна: {{ getCountryName }}</div>
            <div>Вид визы: {{ getVisaName }}</div>
          </div>
          <div>
            <div>Въезд: {{ buyers.go | getDate }}</div>
            <div>Время обработки: {{ getTimespentName }}</div>
          </div>
        </div>
        <div class="wrapper wrapper__info_sm">
          <div class="cost cost_sm">
            <span>Предварительная стоимость:</span>
          </div>

          <div class="price">
            <span>&#8364; {{ buyers.sum }}</span>
          </div>
        </div>
      </div>

      <div class="wrapper wrapper__button">
        <router-link class="btn btn_back" tag="a" to="/">
          <svg
            class="btn_back__img"
            width="9"
            height="13"
            viewBox="0 0 9 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.2524 11.1797L3.65865 6.58594L8.2524 1.99219L6.84615 0.585938L0.846151 6.58594L6.84615 12.5859L8.2524 11.1797Z"
              fill="white"
            />
          </svg>
          Вернуться
        </router-link>
        <a class="btn" @click="sendData"
          >Готово
          <svg
            class="btn__img"
            width="8"
            height="13"
            viewBox="0 0 8 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.278931 11.1797L4.87268 6.58594L0.278931 1.99219L1.68518 0.585938L7.68518 6.58594L1.68518 12.5859L0.278931 11.1797Z"
              fill="white"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StepTwo",
  data() {
    return {
      nationality: [
        {
          id: "RU",
          name: "Россия",
        },
        {
          id: "USA",
          name: "Америка",
        },
        {
          id: "FR",
          name: "Франция",
        },
        {
          id: "DE",
          name: "Германия",
        },
      ],
      name: "",
      surname: "",
      birthday: "",
      national: "",
    };
  },
  methods: {
    sendData() {
      //отправка json в консоль
      const userForm = {
        name: this.name,
        surname: this.surname,
        birthday: this.birthday,
        national: this.national,
        visa: this.buyers.visa,
        country: this.buyers.country,
        go: this.buyers.go,
        back: this.buyers.back,
        timespent: this.buyers.timespent,
        try: this.buyers.try,
        sum: this.buyers.sum,
      };
      console.log(JSON.stringify(userForm));

      this.successAlert(); // вызов модального окна
    },
    successAlert() {
      //модальное окно
      this.$swal({
        position: "top-end",
        icon: "success",
        title: "Данные успешно отправлены!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  computed: {
    buyers() {
      //получение последнего клиента
      return this.$store.getters.buyers;
    },
    travel() {
      //получение json
      return this.$store.getters.travel;
    },
    getCountryName() {
      //перебор массива для вывода страны в информационное окно
      var country;
      for (let i = 0; i < this.travel.countries.length; i++) {
        if (this.buyers.country === this.travel.countries[i].id) {
          country = this.travel.countries[i].name;
          break;
        }
      }
      return country;
    },
    getVisaName() {
      //перебор массива для вывода визы в информационное окно
      var visa;
      for (let i = 0; i < this.travel.types.length; i++) {
        if (this.buyers.visa === this.travel.types[i].id) {
          visa = this.travel.types[i].name;
          break;
        }
      }
      return visa;
    },
    getTimespentName() {
      //перебор массива для вывода кол-ва дней в информационное окно
      var timespent;
      for (let i = 0; i < this.travel.timespent.length; i++) {
        if (this.buyers.timespent === this.travel.timespent[i].id) {
          timespent = this.travel.timespent[i].name;
          break;
        }
      }
      return timespent;
    },
  },
  filters: {
    nameFilter(value) {
      //Выводит первую букву имени в верхнем регистре
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    surnameFilter(value) {
      //Выводит только одну первую букву фамилии в верхнем регистре
      if (!value) return "";
      return value.charAt(0).toUpperCase() + ".";
    },
    getDate(value) {
      //Выводит дату в формате дд.мм.гггг.
      if (!value) return "";
      var date = new Date(value);
      var newDate =
        date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
      return (value = newDate);
    },
  },
  mounted() {
    //заполенение полей после загрузки страницы
    this.national = "RU";
  },
};
</script>