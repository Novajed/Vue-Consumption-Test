const app = new Vue({
  el: '#app',
  data() {
    return {
      info: null,
      loading: true,
      errored: false,
    };
  },
  mounted() {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        this.info = response.data.bpi;
      })
      .catch(error => {
        console.log(error);
        this.errored = true;
      })
      .finally(() => (this.loading = false));
  },
  filters: {
    currencydecimal(value) {
      return value.toFixed(2);
    },
  },
  template: `
  <div class="info-box">
  <img class="bitcoin-logo" src="./bitcoin.svg" alt="bitcoin"/>
  <h2>Bitcoin Price Index</h2>
  <section v-if="errored">
    <p>Ope, we're not able to retrieve this information currently. Sorry about that.</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>

    <div
    v-else
    v-for="currency in info"
    >{{currency.description}}:
  <span class="amount">
  <span v-html="currency.symbol" ></span>{{ currency.rate_float |  currencydecimal}} 
  </span>
  </div>
  </section>
  
  </div>  
  `,
});
