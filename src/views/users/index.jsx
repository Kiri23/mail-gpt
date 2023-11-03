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

