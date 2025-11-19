<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { Button } from "$lib/components/ui/button";
	import type { ButtonProps } from "$lib/components/ui/button";
	import type { Snippet } from "svelte";

	type Props = DialogPrimitive.TriggerProps & ButtonProps & {
		children?: Snippet<[{ builder: any }]>;
	};

	let { asChild = false, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Trigger {...rest} {asChild} let:builder>
	{#if asChild}
		{@render children?.({ builder })}
	{:else}
		<Button variant="outline" builders={[builder]} {...rest} >
			{@render children?.({ builder })}
		</Button>
	{/if}
</DialogPrimitive.Trigger>