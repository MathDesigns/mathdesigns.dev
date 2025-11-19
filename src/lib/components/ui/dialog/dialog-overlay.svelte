<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { fade } from "svelte/transition";
	import { cn } from "$lib/utils";
    import type { TransitionConfig } from "svelte/transition";

    type Transition = (node: Element, params?: any) => TransitionConfig;

	type $$Props = DialogPrimitive.OverlayProps;

    interface Props {
        class?: string;
        transition?: Transition;
        transitionConfig?: TransitionConfig;
        [key: string]: any;
    }

	let { 
        class: className = undefined,
        transition = fade,
        transitionConfig = { duration: 200 },
        ...rest 
    }: Props = $props();
</script>

<DialogPrimitive.Overlay
	{transition}
	{transitionConfig}
	class={cn(
		"fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
		className
	)}
	{...rest}
/>