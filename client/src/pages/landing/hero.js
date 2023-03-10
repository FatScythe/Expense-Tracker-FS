import "./hero.css";
import Man from "../../images/hero.png";

const Hero = () => {
  return (
    <section className='hero'>
      <div className='info'>
        <h2>
          <span>track</span> your <span>expenses</span>
        </h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          laborum doloribus quo obcaecati voluptates labore omnis culpa
          praesentium voluptas nisi.
        </p>
        <a href='/auth'>
          <button className='auth'>Login / Register</button>
        </a>
      </div>
      <div className='img'>
        <img src={Man} alt='man-expense_tracker' />
      </div>
    </section>
  );
};

export default Hero;
