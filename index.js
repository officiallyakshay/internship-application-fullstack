class ElementHandler {
  element(element) {
    if (element.tagName === 'title') {
      element.setInnerContent('Akshay Prabhakar ');
    }
    if (element.tagName === 'h1' && element.getAttribute('id') === 'title') {
      element.prepend('Akshay Prabhakar ');
    }
    if (element.tagName === 'p') {
      element.setInnerContent('Learn more about me through my Linkedin!');
    }
    if (element.tagName === 'a') {
      element.setAttribute('href', 'https://www.linkedin.com/in/akshay-prabhakar/');
      element.setInnerContent('My Linkedin')
    }
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
  // return event.response;
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    let links = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
    let data = await links.json();
    let rand = Math.floor( Math.random() * 2 )
    
    let request = new Request(data.variants[rand])
    let result = await fetch(request)
    result = new Response(result.body, result)
    
    var htmlwriter = new HTMLRewriter()
    htmlwriter
      .on('title', new ElementHandler())
      .on('h1', new ElementHandler())
      .on('p', new ElementHandler())
      .on('a', new ElementHandler())
    return htmlwriter.transform(result)
    // return new Response(response);
  }
  catch(ex) {
    console.error('Error:', ex);
  }
}
