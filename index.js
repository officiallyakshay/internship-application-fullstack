addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
  // return event.response;
})

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  // return new Response('Hello worker!', {
  //   headers: { 'content-type': 'text/plain' },
  // })
  try {
    let links = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
    let data = await links.json();
    let rand = Math.floor( Math.random() * 2 )
    let response = data.variants[rand];
    console.log(response);
    return new Response(response);
  }
  catch(ex) {
    console.error('Error:', ex);
  }
}
