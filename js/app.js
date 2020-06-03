const inp = document.getElementById('input-data');
inp.addEventListener('submit', calculateResults);

const P = document.getElementById('principal');
const R = document.getElementById('rate');
const T = document.getElementById('year');
P.addEventListener('keyup', validate);
R.addEventListener('keyup', validate);
T.addEventListener('keyup', validate);
// T.addEventListener('keyup', Dec0);

const load = document.getElementById('loader');

const res = document.getElementById('results');
const closeBtn = res.querySelector('.close');
closeBtn.addEventListener('click', closeResults);
const output = Array.from(res.querySelectorAll('input'));

function formReset() {
    P.value = '';
    R.value = '';
    T.value = '';
    P.classList.remove('is-invalid');
    R.classList.remove('is-invalid');
    T.classList.remove('is-invalid');
    P.classList.remove('is-valid');
    R.classList.remove('is-valid');
    T.classList.remove('is-valid');
}

function closeResults() {
    res.classList.add('hide');
    formReset();
    inp.classList.remove('hide');
}

function calculateResults(e) {
    e.preventDefault();
    if (validateOnSubmit(P) & validateOnSubmit(R) & validateOnSubmit(T) & Dec0()) {
        const p = parseFloat(P.value);
        const r = parseFloat(R.value) / 12 / 100;
        const t = parseFloat(T.value) * 12;
        let MI = (p * r * Math.pow(1 + r, t) / (Math.pow(1 + r, t) - 1)).toFixed(2);
        if (isFinite(MI)) {
            inp.classList.add('hide');
            res.classList.add('hide');
            load.classList.remove('hide');
            setTimeout(() => {
                load.classList.add('hide');
                res.classList.remove('hide');
            }, 500);
            res.querySelector('.alert-heading>span').textContent = t.toFixed(0);
            output[0].value = MI;
            output[1].value = (MI * t).toFixed(2);
            output[2].value = (MI * t - p).toFixed(2);
        } else {
            if (t > 360) {
                T.classList.add('is-invalid');
            }
            if (r > 0.025) {
                R.classList.add('is-invalid');
            }
        }
    }
}

function validateOnSubmit(x) {
    if (parseFloat(x.value) > 0 && isMaxDec2(x.value)) {
        x.classList.remove('is-invalid');
        x.classList.add('is-valid');
        return true;
        // console.log(x);
    } else {
        x.classList.add('is-invalid');
        x.classList.remove('is-valid');
        return false;
        // console.warn(x);
    }

}

function Dec0() {
    // console.log(T.value);
    if (T.value.indexOf('.') == -1) {
        T.classList.remove('is-invalid');
        T.classList.add('is-valid');
        // console.log(T.value);
    } else {
        T.classList.add('is-invalid');
        T.classList.remove('is-valid');
    }
}

function validate(e) {
    if (parseFloat(e.target.value) > 0 && isMaxDec2(e.target.value)) {
        e.target.classList.remove('is-invalid');
        e.target.classList.add('is-valid');
        if (e.target.id == 'year') {
            Dec0();
        }
        // console.log(e.target.id);
    } else {
        e.target.classList.add('is-invalid');
        e.target.classList.remove('is-valid');
        // console.warn(e.target);
    }
}

function isMaxDec2(x) {
    if (x.indexOf('.') == -1 || x.split(".")[1].length <= 2) {
        return true;
    }
    return false;
}