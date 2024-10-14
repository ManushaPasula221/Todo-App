import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import './EditTodo.css';

const EditTodo = ({ isOpen, onClose, task, onEdit }) => {
    const [newTask, setNewTask] = React.useState("");

    useEffect(() => {
      if (isOpen) {
        setNewTask(task);
      }
    }, [isOpen, task]);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onEdit(newTask);
      onClose();
    };
  
    return (
      isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Task</h2>
            <form onSubmit={handleSubmit} className='edit-form'>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                required
              />
              <button type="submit" className='save'>
                <FontAwesomeIcon icon={faCheck} />
              </button>
              <button type="button" onClick={onClose} className='cancel'>
                <FontAwesomeIcon icon={faX} />
              </button>
            </form>
          </div>
        </div>
      )
    );
  };

export default EditTodo;
