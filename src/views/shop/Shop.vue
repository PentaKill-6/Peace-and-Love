<template>
    <div class="shop-box">
        <shop-head></shop-head>
        <shop-main></shop-main>
    </div>
</template>

<script>
import shopHead from "../../components/shop/shopHead"
import shopMain from "../../components/shop/shopMain"
export default {
    components: {
        shopHead,
        shopMain
    }
}
</script>

<style>
    .shop-box {
        width: 7.5rem;
        height: 100%;
    }
</style>
