<script setup>
import DefaultTheme from "vitepress/theme";
import { onMounted } from "vue";
import { useRouter } from "vitepress";
import mediumZoom from "medium-zoom";
import PackageBadge from "./PackageBadge.vue";

const { Layout } = DefaultTheme;
const router = useRouter();

// Setup medium zoom with the desired options
const setupMediumZoom = () => {
	mediumZoom("[data-zoomable]", {
		background: "transparent",
	});
};

// Apply medium zoom on load
onMounted(setupMediumZoom);

// Subscribe to route changes to re-apply medium zoom effect
router.onAfterRouteChanged = setupMediumZoom;
</script>

<template>
	<Layout>
		<template #doc-before>
			<PackageBadge/>
		</template>
	</Layout>
</template>

<style>
.medium-zoom-overlay {
	backdrop-filter: blur(2.5rem) brightness(80%);
}

.medium-zoom-overlay,
.medium-zoom-image--opened {
	z-index: 999;
}
</style>