<template>
    <div class="substances">
        <NavBar></NavBar>
        <h2>{{title}}</h2>
        <p>TEST</p>
        <Footer></Footer>
    </div>
</template>

<script>
import NavBar from '@/components/Nav';
import Footer from '@/components/Footer';
export default {
    components: {
        'NavBar' : NavBar,
        'Footer' : Footer
    },
    data (){
        return{
            title:"Données par substance"
        }
    }
}
</script>

<style scoped>
h1,
h2 {
  color:black;
  font-weight: normal;
  background-color: white;
  margin:0px 10px;
  padding: 10px;
}
.substances {
  padding: 5px;
  background-color: #eee;
  cursor:default;
}
</style>
