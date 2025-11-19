<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { flyAndScale } from "$lib/utils";
	import { cn } from "$lib/utils";
	import DialogOverlay from "./dialog-overlay.svelte";
	import DialogPortal from "./dialog-portal.svelte";
	import X from "lucide-svelte/icons/x";
    import type { Snippet } from "svelte";
    import type { TransitionConfig } from "svelte/transition";

    type Transition = (node: Element, params?: any) => TransitionConfig;

	type $$Props = DialogPrimitive.ContentProps;

	interface Props {
		class?: string;
		transition?: Transition;
		transitionConfig?: any; 
		children?: Snippet;
		[key: string]: any
	}

	let {
		class: classNameFromProp = undefined,
		transition = flyAndScale,
		transitionConfig = {
            duration: 250,
            y: -30,
            start: 0.96,
            opacity: 0
        },
		children,
		...rest
	}: Props = $props();
</script>

<DialogPortal>
	<DialogOverlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			"fixed left-[50%] top-[40%] md:top-[50%]",
			"translate-x-[-50%] translate-y-[-50%]",
			"z-[51]",
			"w-[95vw] sm:w-[90vw] max-w-xl",
			"bg-background border border-border",
			"shadow-2xl rounded-lg",
			"focus-visible:ring-0 focus-visible:outline-none",
			classNameFromProp
		)}
		{...rest}
		>
		{@render children?.()}
		<DialogPrimitive.Close
			class="absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			<X class="h-4 w-4" />
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</DialogPortal>