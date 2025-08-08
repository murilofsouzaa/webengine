async function fetchData() {
        const res = await fetch(`http://localhost:3000/carros`);
        const data = await res.json();
        return data;
    }

    async function setupSponsorCars() {
        const data = await fetchData();

        const cardContainers = document.querySelectorAll('.card-car > ul');

        const selectedCars = data;

        selectedCars.forEach((carBrand, index) => {
            const model = carBrand.models[0];
            const generation = model.generations[0];
            const imageUrl = generation.images[0].big;

            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `${carBrand.name} ${model.name}`;
            img.classList.add('car-img');
            img.style.width = '260px';

            li.appendChild(img);

            cardContainers[index].appendChild(li);
        });
    }

    setupSponsorCars();