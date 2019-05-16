<template>
  <div class="mesures">
    <NavBar></NavBar>
    <h2>{{ msg }}</h2>
    <GraphD3 :sampleLocation="0"></GraphD3>
    <GraphD3 :sampleLocation="1"></GraphD3>
    <GraphD3 :sampleLocation="2"></GraphD3>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import NavBar from '@/components/Nav';
import Footer from '@/components/Footer';
import GraphD3 from '@/components/GraphD3';
export default {
    components: {
        'NavBar' : NavBar,
        'Footer' : Footer,
        'GraphD3': GraphD3
    },
  name: "Mesures",
  data() {
    return {
      msg: "Données par prélevement"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  color:black;
  font-weight: normal;
  background-color: white;
  margin:0px 10px;
  padding: 10px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mesures {
  padding: 5px;
  background-color: #eee;
  cursor:default;
}
</style>
