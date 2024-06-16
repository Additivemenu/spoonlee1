<template>
	<div class="child">
		<h3>子组件</h3>
		<!-- !v-bind="$attrs" 是把父传来的props自己不要, 传给自己的子 -->
		<GrandChild v-bind="$attrs"/>
	</div>
</template>

<script setup lang="ts" name="Child">
	import GrandChild from './GrandChild.vue'
</script>

<style scoped>
	.child{
		margin-top: 20px;
		background-color: skyblue;
		padding: 20px;
		border-radius: 10px;
		box-shadow: 0 0 10px black;
	}
</style>