<template>
    <div class="nav-bar"> 
  <h1>{{title}}</h1> 
  <nav>
    <button><router-link to="/">Home</router-link></button><button><router-link to="/mesures">Mesures</router-link></button><button><router-link to="/substances">Substances</router-link></button>
  </nav> 

</div>
</template>

<script>
export default {
    data(){
        return{
            title:'S.C.I La Garenne'
        }
    }
}
</script>

<style scoped>
    .nav-bar{
        color:white;
        background-color: seagreen;
        padding-top: 10px;
        margin:10px 10px 0px;
    }
    .nav-bar h1{
        cursor:default;
        margin:0px 10px 5px;
    }
    .nav-bar button{
        background-color:lightseagreen;
        border:none;
        color:white;
        padding: 5px;
        margin:0px;
        display: inline;
    }
    .nav-bar button:hover{
        background-color:darkseagreen;
        
    }
    a:link, a:hover, a:focus, a:active, a:visited{
        text-decoration:none;
        color: black;
    }
</style>

