<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { Button, type ButtonProps } from "$lib/components/ui/button";
	import { cn } from "$lib/utils"; 
	import X from "lucide-svelte/icons/x";
    import type { Snippet } from "svelte";

	type BaseProps = DialogPrimitive.CloseProps & ButtonProps;

	type Props = BaseProps & {
		class?: string;
		children?: Snippet;
		[key: string]: any
	};

	let { asChild = false, class: className = undefined, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Close
	{asChild}
	class={cn(
		"absolute right-3 top-3 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		className
	)}
	{...rest}
	on:click
	on:keydown
>
	{#if asChild}
		{@render children?.()}
	{:else}
		<X class="h-4 w-4" />
		<span class="sr-only">Close</span>
	{/if}
</DialogPrimitive.Close>