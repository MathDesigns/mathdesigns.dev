<script lang="ts">
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Mail, Send, Linkedin, Github, MapPin } from 'lucide-svelte';
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const FORM_ENDPOINT = 'https://formspree.io/f/mqaqrvwg';

	const yourEmail = 'math@mathdesigns.dev';
	const yourLinkedIn = 'https://www.linkedin.com/in/matheo-simeoni/';
	const yourGitHub = 'https://github.com/MathDesigns';
	const yourLocation = 'Wallonia, Belgium';

	let formStatus: 'idle' | 'submitting' | 'success' | 'error' = 'idle';
	let formMessage = '';

	async function handleSubmit(event: SubmitEvent) {
		formStatus = 'submitting';
		formMessage = '';
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);

		try {
			const response = await fetch(form.action, {
				method: form.method,
				body: data,
				headers: {
					Accept: 'application/json'
				}
			});

			if (response.ok) {
				formStatus = 'success';
				formMessage = "Thanks for your message! I'll get back to you soon.";
				form.reset();
			} else {
				const responseData = await response.json();
				if (Object.hasOwn(responseData, 'errors')) {
					formMessage = responseData['errors']
						.map((error: { message: string }) => error['message'])
						.join(', ');
				} else {
					formMessage = 'Oops! There was a problem submitting your form.';
				}
				formStatus = 'error';
			}
		} catch (error) {
			formMessage = 'Oops! There was a problem submitting your form.';
			formStatus = 'error';
		} finally {
			if (formStatus !== 'success' && formStatus !== 'submitting') {
				setTimeout(() => {
					if (formStatus !== 'submitting') formStatus = 'idle';
				}, 5000);
			}
		}
	}
</script>

<svelte:head>
	<title>Contact Me | MathDesigns</title>
	<meta
		name="description"
		content="Get in touch with MathDesigns. Let's discuss your project or just say hello!"
	/>
</svelte:head>

<div class="container mx-auto px-4 py-16 md:px-0">
	<div
		class="mx-auto mb-12 max-w-3xl text-center"
		in:fly={{ y: 20, duration: 500, easing: quintOut }}
	>
		<h1 class="mb-4 text-4xl font-bold md:text-5xl">Get In Touch</h1>
		<p class="text-lg leading-relaxed text-muted-foreground md:text-xl">
			Have a project in mind, a question, or just want to say hello? I'd love to hear from you!
		</p>
	</div>

	<div class="mx-auto grid max-w-5xl gap-10 md:grid-cols-5 lg:gap-16">
		<div
			class="space-y-6 md:col-span-2"
			in:fly={{ x: -30, duration: 500, delay: 200, easing: quintOut }}
		>
			<h2 class="mb-4 text-2xl font-semibold text-foreground">Contact Information</h2>
			<div
				class="flex items-start rounded-lg border border-border/30 bg-card/50 p-4 transition-shadow hover:shadow-md"
			>
				<MapPin class="mr-4 mt-1 h-6 w-6 shrink-0 text-primary" />
				<div>
					<h3 class="font-medium text-foreground">Location</h3>
					<p class="text-muted-foreground">{yourLocation}</p>
				</div>
			</div>
			<a
				href="mailto:{yourEmail}"
				class="flex items-start rounded-lg border border-border/30 bg-card/50 p-4 transition-shadow hover:border-primary/50 hover:shadow-md"
			>
				<Mail class="mr-4 mt-1 h-6 w-6 shrink-0 text-primary" />
				<div>
					<h3 class="font-medium text-foreground">Email</h3>
					<p class="break-all text-muted-foreground">{yourEmail}</p>
				</div>
			</a>
			<h3 class="pt-4 text-xl font-semibold text-foreground">Connect With Me</h3>
			<div class="flex space-x-4">
				<Button
					href={yourLinkedIn}
					target="_blank"
					variant="outline"
					size="icon"
					aria-label="LinkedIn Profile"
				>
					<Linkedin class="h-5 w-5" />
				</Button>
				<Button
					href={yourGitHub}
					target="_blank"
					variant="outline"
					size="icon"
					aria-label="GitHub Profile"
				>
					<Github class="h-5 w-5" />
				</Button>
			</div>
		</div>

		<div class="md:col-span-3" in:fly={{ x: 30, duration: 500, delay: 300, easing: quintOut }}>
			<h2 class="mb-6 text-2xl font-semibold text-foreground">Send Me a Message</h2>
			<form
				action={FORM_ENDPOINT}
				method="POST"
				class="space-y-6"
				on:submit|preventDefault={handleSubmit}
			>
				<div>
					<Label for="name" class="text-sm font-medium">Full Name</Label>
					<Input
						type="text"
						id="name"
						name="name"
						required
						placeholder="Your Name"
						class="mt-1.5"
					/>
				</div>
				<div>
					<Label for="email" class="text-sm font-medium">Email Address</Label>
					<Input
						type="email"
						id="email"
						name="email"
						required
						placeholder="you@example.com"
						class="mt-1.5"
					/>
				</div>
				<div>
					<Label for="subject" class="text-sm font-medium">Subject</Label>
					<Input
						type="text"
						id="subject"
						name="subject"
						placeholder="Regarding..."
						class="mt-1.5"
					/>
				</div>
				<div>
					<Label for="message" class="text-sm font-medium">Message</Label>
					<Textarea
						id="message"
						name="message"
						rows={5}
						required
						placeholder="Your message here..."
						class="mt-1.5 min-h-[120px]"
					/>
				</div>

				{#if formMessage}
					<div
						role="alert"
						aria-live="polite"
						class="rounded-md border p-3 text-sm font-medium {formStatus === 'success'
							? 'border-green-200 bg-green-50 text-green-600 dark:border-green-900 dark:bg-green-900/20'
							: 'border-red-200 bg-red-50 text-red-600 dark:border-red-900 dark:bg-red-900/20'}"
					>
						{formMessage}
					</div>
				{/if}

				<div>
					<Button
						type="submit"
						class="w-full px-8 py-3 text-base md:w-auto"
						disabled={formStatus === 'submitting'}
					>
						{#if formStatus === 'submitting'}
							<span
								class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
								role="status"
								aria-label="loading"
							></span>
							Sending...
						{:else}
							<Send class="mr-2 h-4 w-4" /> Send Message
						{/if}
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>
