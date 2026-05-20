function Step({ id, name, step, image }) {
  return (
    <article className="roadmap-item">
      <span className="roadmap-step">{step}</span>
      <img src={image} className="technology-img" alt="" />
      <div className="roadmap-content">
        <h1 className="technology-name">{name}</h1>
      </div>
      <div className="img-overlay"></div>
    </article>
  );
}

export default Step;
