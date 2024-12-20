// import './button.css';

export const createButton = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
}) => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = label;
  btn.addEventListener('click', onClick);

  const mode = primary ? 'btn' : 'skeleton';
  btn.className = ['btn', mode].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
