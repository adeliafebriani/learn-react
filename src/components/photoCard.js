const PhotoCard = ({ src, name }) => {
	return (
		<section>
			<img src={src} alt={name} />
			<p>{name}</p>
		</section>
	);
};

export default PhotoCard;
