<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";
    import type { Snippet } from "svelte";

	type $$Props = DialogPrimitive.DescriptionProps;

    interface Props extends $$Props {
        class?: string;
        children?: Snippet;
    }

    let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Description
	class={cn("text-sm text-muted-foreground", className)}
	{...rest}
>
    {@render children?.()}
</DialogPrimitive.Description>