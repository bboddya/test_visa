<template>
  <div class="section">
    <div class="container">
      <h1>Шаг 1.</h1>

      <form class="wrapper">
        <div class="wrapper wrapper_row wrapper_row_top">
          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="country">Выберите страну</label>
            </div>
            <select id="country" class="form-control" v-model="form.country_id">
              <option
                v-for="(contrie, index) in travel.countries"
                :key="index"
                :value="contrie.id"
              >
                {{ contrie.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="visa">Тип визы</label>
            </div>
            <select id="visa" class="form-control" v-model="form.visa_type_id">
              <option
                v-for="(visa, index) in travel.types"
                :key="index"
                :value="visa.id"
              >
                {{ visa.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="wrapper wrapper_row">
          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="goTo">Въезд</label>
            </div>
            <input
              class="form-control form-control__date"
              v-model="form.go"
              type="date"
              id="goTo"
            />
          </div>

          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="goBack">Выезд</label>
            </div>
            <input
              class="form-control form-control__date"
              v-model="form.back"
              type="date"
              id="goBack"
            />
          </div>

          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="try">Количество заездов</label>
            </div>
            <select id="try" class="form-control" v-model="form.try_id">
              <option
                v-for="(trip, index) in tryTrip"
                :key="index"
                :value="trip.id"
              >
                {{ trip.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <div class="form-group form-group__label">
              <label for="time">Время обработки</label>
            </div>
            <select id="time" class="form-control" v-model="form.timespent_id">
              <option
                v-for="(time, index) in timespent"
                :key="index"
                :value="time.id"
              >
                {{ time.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="wrapper wrapper_row wrapper_row_bot">
          <div class="wrapper wrapper__info">
            <div class="cost">
              <span>Предварительная стоимость:</span>
            </div>

            <div class="price">
              <span>&#8364; {{ sumCount }}</span>
            </div>
          </div>

          <router-link
            class="btn"
            tag="a"
            @click.native="createBuyer"
            to="/form"
            >Продолжить
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
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Main",

  data() {
    return {
      form: {
        country_id: "",
        visa_type_id: "",
        try_id: "",
        timespent_id: "",
        go: "",
        back: "",
      },
    };
  },
  methods: {
    createBuyer() {
      //создание клиента
      const buyer = {
        country: this.form.country_id,
        visa: this.form.visa_type_id,
        try: this.form.try_id,
        timespent: this.form.timespent_id,
        go: this.form.go,
        back: this.form.back,
        sum: this.sumCount,
      };

      this.$store.dispatch("createBuyer", buyer);
    },
  },
  computed: {
    travel() {
      //получение json
      return this.$store.getters.travel;
    },
    tryTrip() {
      //фильтр масива для поиска relation в try
      return this.travel.try.filter((n) => n.relative === this.form.country_id);
    },
    timespent() {
      //фильтр масива для поиска relation в timespent
      return this.travel.timespent.filter(
        (n) => n.relative === this.form.country_id
      );
    },
    sumCount() {
      //перебор каждого массива travel для поиска стоимости
      for (let i = 0; i < this.travel.types.length; i++) {
        if (this.form.visa_type_id === this.travel.types[i].id) {
          var a = parseFloat(this.travel.types[i].price.replace(",", "."));
          break;
        }
      }

      for (let i = 0; i < this.travel.try.length; i++) {
        if (
          this.form.try_id === this.travel.try[i].id &&
          this.form.country_id === this.travel.try[i].relative
        ) {
          var b = parseFloat(this.travel.try[i].price.replace(",", "."));
          break;
        }
      }

      for (let i = 0; i < this.travel.timespent.length; i++) {
        if (
          this.form.timespent_id === this.travel.timespent[i].id &&
          this.form.country_id === this.travel.timespent[i].relative
        ) {
          var c = parseFloat(this.travel.timespent[i].price.replace(",", "."));
          break;
        }
      }
      return a + b + c;
    },
  },
  mounted() {
    //заполенение полей после загрузки страницы
    this.form.country_id = "RU";
    this.form.visa_type_id = "tur";
    this.form.try_id = "single";
    this.form.timespent_id = "fast";
  },
};
</script>