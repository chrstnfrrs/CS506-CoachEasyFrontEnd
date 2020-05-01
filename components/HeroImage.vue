<template>
    <section class="masthead" role="img" aria-label="Image Description">
        <h1 class="heroHeader">
            Fitness Is Everyday
        </h1>
        <button class="submitBtn heroBtn" @click="heroRedirect()">
            Sign Up
        </button>
    </section>
</template>

<script>
export default {
    methods: {
        heroRedirect: function() {
            window.location.assign("/signUp")
        }
    }
}
</script>

<style lang="scss">
.masthead {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: calc(100vh - 64px); /* if you don't want it to take up the full screen, reduce this number */
  overflow: hidden;
  background-size: cover;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 37%, rgba(0,0,0,0.65) 100%), url(https://images.pexels.com/photos/2261481/pexels-photo-2261481.jpeg?cs=srgb&dl=black-barbel-2261481.jpg&fm=jpg) no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.masthead::after {
    content: ""; // ::before and ::after both require content
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $text;
    opacity: .7;
}

.heroHeader {
  font-style: normal;
  font-weight: bold;
  color: $background !important;
  font-size: 11vmin;
  letter-spacing: 0.03em;
  line-height: 1;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 40px;
  z-index: 100;
}

.heroBtn{
    z-index: 100;
    color: $background !important;
}

button:focus {
  outline: 1px solid #fff;
  outline-offset: -4px;
}
</style>
