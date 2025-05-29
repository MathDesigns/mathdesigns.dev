<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { Button } from "$lib/components/ui/button"; // Using your existing Button
	type Props = DialogPrimitive.TriggerProps & Button.Props; // Combining props
	type Events = DialogPrimitive.TriggerEvents;

	export let asChild: Props["asChild"] = false;
	let props: Props = $$props;
</script>

<DialogPrimitive.Trigger {...props} {asChild} let:builder>
	{#if asChild}
		<slot {builder} />
	{:else}
		<Button variant="outline" {...props} builder={builder} on:click>
			<slot />
		</Button>
	{/if}
</DialogPrimitive.Trigger>