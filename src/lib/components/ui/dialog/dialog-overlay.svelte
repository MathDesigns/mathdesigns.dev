<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { fade } from "svelte/transition";
	import { cn } from "$lib/utils"; //

	type Props = DialogPrimitive.OverlayProps;
	let props: Props = $$props;
	let  className: Props["class"] = undefined;
	export { className as class }; 

	export let transition: DialogPrimitive.Transition = fade; // Active
	export let transitionConfig: DialogPrimitive.TransitionConfig = { // Active
		duration: 200 // Slightly faster fade for overlay
	};
</script>

<DialogPrimitive.Overlay
	{transition}
	{transitionConfig}
	class={cn(
		"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm", // Standard overlay style with z-50
		className
	)}
	{...props}
/>