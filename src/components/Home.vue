<template>
    <div class="home">
        <NavBar></NavBar>
        <h1>{{title}}</h1>
        <h2>{{msg}}</h2>
        <router-view/>
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
    data(){
        return {
            title:'Welcome!',
            msg:'Relevés de substances dans le sol'
        }
    }
}
</script>

<style scoped>
.home{
    background-color: #eee;
    padding:5px;
}
.home h1{
    font-size: 33px;
}
.home h2{
    font-size: 25px;
    color:lightseagreen;
}
h1,
h2 {
  color:black;
  font-weight: normal;
  background-color: white;
  margin:0px 10px;
  padding: 10px;
}
</style>


