// I need to wrap in a component so the element is returned
// if not I get a blank page
<>
  {emails.map(email => (
    <div class="card" key={email}>
      <div class="card-body">
        <h5 class="card-title">{email.author}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">{email.category}</h6>
        <p class="card-text">{email.description}</p>
        <a href={email.link} class="card-link">Read more</a>
      </div>
  </div>
    ))}
</>

