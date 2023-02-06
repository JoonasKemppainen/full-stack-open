const Header = (props) => <h1>{props.course}</h1>

const Total = ({parts}) => <p><strong>total of {parts.reduce((sum, part) => sum + part.exercises,0)} exercies</strong></p>

const Content = ({parts}) => {
  return (
   <>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
   </>
  )
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course