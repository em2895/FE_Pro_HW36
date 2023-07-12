const API = 'https://jsonplaceholder.typicode.com'

const body = document.querySelector('body');
const idInput = document.querySelector('#postId');
const findPostBtn = document.querySelector('#findPost');

getData = path => fetch(path).then(response => response.json());

idInput.addEventListener('input', () => {
    value = idInput.value;

    (value > 0 && value <= 100)
        ? findPostBtn.removeAttribute('disabled')
        : findPostBtn.setAttribute('disabled', '');

})

findPostBtn.addEventListener('click', () => {
    const id = idInput.value;

    getData(API + '/posts/' + id)
        .then(data => renderPost(data));
});

function renderPost(post) {
    if (document.querySelector(`.id-${post.id}`)) { return 0 };

    const postDiv = document.createElement('div');
    const postHeading = document.createElement('h3')
    const postText = document.createElement('p');
    const showCommentsBtn = document.createElement('button');
    const hideCommentsBtn = document.createElement('button');

    postText.innerText = post.body;
    postHeading.innerText = post.title;
    showCommentsBtn.innerText = 'Show comments';
    hideCommentsBtn.innerText = 'Hide comments'

    postDiv.classList.add('post');
    postDiv.classList.add(`id-${post.id}`);
    hideCommentsBtn.classList.add('d-none')

    showCommentsBtn.addEventListener('click', () => {
        showCommentsBtn.classList.add('d-none');
        hideCommentsBtn.classList.remove('d-none');

        getData(API + '/comments?postId=' + post.id)
            .then(data => renderComments(postDiv, data))
    });

    hideCommentsBtn.addEventListener('click', () => {
        showCommentsBtn.classList.remove('d-none');
        hideCommentsBtn.classList.add('d-none');

        const comments = document.querySelectorAll(`.id-${post.id} .comment`);
        comments.forEach(comment => comment.remove());
    })

    postDiv.append(postHeading);
    postDiv.append(postText);
    postDiv.append(showCommentsBtn);
    postDiv.append(hideCommentsBtn);
    body.append(postDiv);
}

function renderComments(container, comments) {
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        const commentP = document.createElement('p');

        commentDiv.classList.add('comment');

        commentP.innerText = comment.body;

        commentDiv.append(commentP);
        container.append(commentDiv);
    });
}