// TODO: show an example of app crashing
const movieList = document.querySelector('.movie-list');

const updateModalInfo = (movie) => {
    try {
        const { Title, Plot, Released, Genre, Language, Actors, Poster, trailer } = movie;
        const modalTitle = document.querySelector('#modal-title');
        modalTitle.innerHTML = Title;
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = `
        <img src="${Poster}" alt="Poster" style="height: 200px; width: 200px;" />
        <ul class="list-group">
          <li class="list-group-item bg-dark text-white"><strong>Genre:</strong> ${Genre}</li>
          <li class="list-group-item bg-dark text-white"><strong>Actors:</strong> ${Actors}</li>
          <li class="list-group-item bg-dark text-white"><strong>Language:</strong> ${Language}</li>
          <li class="list-group-item bg-dark text-white"><strong>Plot:</strong> ${Plot}</li>
          <li class="list-group-item bg-dark text-white"><strong>Released:</strong> ${Released}</li>
        </ul>
        `;
        const watchTrailerBtn = document.querySelector('.watch-trailer-btn');
        const trailerFrame = document.querySelector('#trailer-frame');
        trailerFrame.src = trailer;
        watchTrailerBtn.setAttribute('data-bs-toggle', 'modal');
        watchTrailerBtn.setAttribute('data-bs-target', '#trailer-modal');
    } catch (error) {
        console.log(error.message);
    }
}

const createCard = (movie) => {
    const {Title, Plot, Poster, Released} = movie;
    const card = document.createElement('div');
    card.setAttribute('data-bs-toggle', 'modal');
    card.setAttribute('data-bs-target', '#movie-modal');
    card.classList.add('card', 'bg-dark', 'text-white');
    const cardBody = `
        <img src=${Poster} class="card-img" alt="...">
        <div class="card-img-overlay d-flex column justify-content-end">
          <h5 class="card-title">${Title}</h5>
          <p class="card-text shorten-text">${Plot}</p>
          <p class="card-text">Released on ${Released}</p>
        </div>
    `;
    card.addEventListener('click', () => updateModalInfo(movie))
    card.innerHTML = cardBody;
    movieList.append(card);
}

const fetchMovies = async () => {
    try {
        const movies = [
            {
                title: 'Aquaman+and+the+Lost+Kingdom',
                trailer: 'https://www.youtube.com/embed/aEiDgcka7ts'
            },
            {
                title: 'The+Marvels',
                trailer: 'https://www.youtube.com/embed/Wh1h73V8Pc4'
            }, 
            {
                title: 'Ant-Man+and+the+Wasp:+Quantumania',
                trailer: 'https://www.youtube.com/embed/ZlNFpri-Y40'
            },
            {
                title: 'Guardians+of+the+Galaxy+Vol.+3',
                trailer: 'https://www.youtube.com/embed/u3V5KDHRQvk'
            },
            {
                title: 'Fast+X',
                trailer: 'https://www.youtube.com/embed/GMKu0CWhbUk'
            },
            {
                title: 'Spider-Man:+Across+the+Spider-Verse',
                trailer: 'https://www.youtube.com/embed/cqGjhVJWtEg'
            },
            {
                title: 'Mission:+Impossible+-+Dead+Reckoning+Part+One',
                trailer: 'https://www.youtube.com/embed/2m1drlOZSDw'
            },
            {
                title: 'John+Wick:+Chapter+4',
                trailer: 'https://www.youtube.com/embed/qEVUtrk8_B4'
            },
            {
                title: 'Dune:+Part+Two',
                trailer: 'https://www.youtube.com/embed/7WdkPwJTnQk'
            },
            {
                title: 'The+Expendables+4',
                trailer: 'https://www.youtube.com/embed/dzrPBT2cvVk'
            }
        ];
        const fetchedMovies = [];
        movies.forEach(async (movie) => {
            let fetchedMovie = await fetch(`https://www.omdbapi.com/?t=${movie.title}&apikey=4caa4ffe`)
            fetchedMovie = await fetchedMovie.json();
            new Promise(resolve => {
                fetchedMovies.push({ ...fetchedMovie, trailer: movie.trailer });
                setTimeout(() => resolve(fetchedMovie), 1000)
            })
        });
        setTimeout(() => {
            console.log(fetchedMovies);
            fetchedMovies.forEach((movie) => createCard(movie));
        }, 1000);
    } catch (error) {
        console.log(error.message);
    }
}

fetchMovies();

