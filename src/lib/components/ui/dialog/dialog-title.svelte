<script lang="ts">
	import { Dialog as DialogPrimitive } from "bits-ui";
	import { cn } from "$lib/utils";

	type Props = DialogPrimitive.TitleProps;
	let props: Props = $$props;
	let className: Props["class"] = undefined;
	export { className as class };
</script>

<DialogPrimitive.Title
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...props}
>
	<slot />
</DialogPrimitive.Title>