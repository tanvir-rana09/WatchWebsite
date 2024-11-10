const Loader = () => {
	return (
		<div className="flex h-screen w-screen absolute top-0 left-0 z-[999999999999] right-0 bottom-0 items-center justify-center bg-white">
			<div className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-blue border-t-gray-100"></div>
		</div>
	);
};

export default Loader;
