//Joukkueiden haku listana, jonka voisi ottaa käyttöön joukkueen haussa
fetch("https://statsapi.web.nhl.com/api/v1/teams/")
          .then(response => response.json())
          .then(data => console.log(data))

//  app joukkueita varten
var app = new Vue({
    el: '#app',
        data: {
            title: "NHLjoukkueet-app",
            joukkue: '',
            areena: '',
            kaupunki: '',
            kotisivu: '',
            numero: ''
            },
methods: {
    tiedot: function () {
        // Joukkueiden tiedot annetun numeron mukaan
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${this.numero}`)
        .then(function (response) {
            app.joukkue = response.data.teams[0].name;
            app.areena = response.data.teams[0].venue.name;
            app.kaupunki = response.data.teams[0].venue.city;
            app.kotisivu = response.data.teams[0].officialSiteUrl;
        })
    }

  }
})

// app pelaajien hakuun
new Vue({
    el: "#api",
        data: {
        pelaajat: [],
        etsi: "jussi"//tulostettava lista oli niin suuri, ettö oletukseksi hakua
        },
    methods: {
      pelaajienData() {
        fetch("https://statsapi.web.nhl.com/api/v1/draft/prospects/")
          .then(response => response.json())
          .then(res => {
            if (this.etsi) { 
              this.pelaajat = res.prospects.filter(pelaajat =>
                pelaajat.fullName.toLowerCase().includes(this.etsi.toLowerCase())
              );
            } else {
              this.pelaajat = res.prospects;
            }
          });
      }
    },
    created() {
      this.pelaajienData();
    }
  })






     
         
