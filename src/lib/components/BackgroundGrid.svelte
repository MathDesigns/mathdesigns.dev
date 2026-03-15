<script lang="ts">
	import { T, useTask } from '@threlte/core';

	let coreRotX = $state(0);
	let coreRotY = $state(0);
	let floatY = $state(0);
	let orbit = $state(0);

	useTask((delta) => {
		// Central core rotation
		coreRotX += delta * 0.3;
		coreRotY += delta * 0.4;
		
		// Faster satellite orbit
		orbit += delta * 1.8; 
		
		// Unified levitation for the entire system
		floatY = Math.sin(performance.now() * 0.002) * 0.2;
	});

	// Defined orbital planes for the Atom look
	const planes = [
		{ tiltZ: 0.8, tiltX: 0, offset: 0, shape: 'tetrahedron' },
		{ tiltZ: -0.8, tiltX: 0.5, offset: Math.PI / 2, shape: 'octahedron' },
		{ tiltZ: 0, tiltX: 1.2, offset: Math.PI, shape: 'icosahedron' },
		{ tiltZ: 1.5, tiltX: -0.8, offset: (Math.PI * 3) / 2, shape: 'dodecahedron' }
	];
</script>

<T.PerspectiveCamera position={[0, 0, 11]} fov={50} makeDefault />

<T.AmbientLight intensity={0.4} />
<T.DirectionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
<T.DirectionalLight position={[-5, -5, -5]} intensity={1} color="#A855F7" />

<T.Group position.y={floatY}>
	
	<T.Mesh rotation.x={coreRotX} rotation.y={coreRotY}>
		<T.BoxGeometry args={[1.5, 1.5, 1.5]} />
		<T.MeshPhysicalMaterial 
			color="#7C3AED" 
			roughness={0.15} 
			metalness={0.2} 
			clearcoat={1} 
			clearcoatRoughness={0.1}
		/>
	</T.Mesh>

	{#each planes as plane}
		<T.Group rotation.z={plane.tiltZ} rotation.x={plane.tiltX}>
			
			<T.Group rotation.y={orbit + plane.offset}>
				
				<T.Mesh position.x={3} rotation.x={orbit * 3} rotation.y={orbit * 3}>
					
					{#if plane.shape === 'tetrahedron'}
						<T.TetrahedronGeometry args={[0.15]} />
					{:else if plane.shape === 'octahedron'}
						<T.OctahedronGeometry args={[0.15]} />
					{:else if plane.shape === 'icosahedron'}
						<T.IcosahedronGeometry args={[0.15, 0]} />
					{:else}
						<T.DodecahedronGeometry args={[0.15]} />
					{/if}

					<T.MeshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
					<T.PointLight intensity={12} distance={6} color="#ffffff" />
				</T.Mesh>

			</T.Group>
		</T.Group>
	{/each}

</T.Group>