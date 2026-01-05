let Paragraph = () => <p> This is a paragraph </p>;

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
};

const Content = ({parts}) => {
  console.log(parts);
  return (
    <>
      <Paragraph />
      <Part part= {parts[0].name} exercises= {parts[0].exercises}/>
      <Part part= {parts[1].name} exercises= {parts[1].exercises}/>
      <Part part= {parts[2].name} exercises= {parts[2].exercises}/>
    </>
  )
};

const Part = ({part, exercises}) => {
  return (
    <p>{part} {exercises}</p>
  )
};

const Total = ({exerciseTotal}) => {
  return (
  <p>Number of exercises {exerciseTotal}</p>
  )
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ],
  };

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts} />
      <Total exerciseTotal={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </div>
  )
}
export default App