<template>
	<div v-if="frontmatter.package">
		<Badge class="package" type="info">
			<a title="Package" target="_blank" :href="`https://www.npmjs.com/package/${frontmatter.package}`">{{ frontmatter.package }}</a>
		</Badge>
	</div>
</template>

<script setup>
import { useData } from "vitepress";

const { frontmatter } = useData();
</script>

<style scoped>
.package {
	font-size: 1rem;
	margin-bottom: 32px;
}

.package > a {
	color: inherit;
	text-decoration: none;
	vertical-align: super;
	white-space: nowrap;
}
</style>