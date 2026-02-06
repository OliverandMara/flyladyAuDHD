import { useState } from 'react';
import { useRooms, useTasks } from '@/hooks/useDB';
import { Button } from '@/components/shared/Button';
import { Card } from '@/components/shared/Card';
import { Modal } from '@/components/shared/Modal';
import './RoomsScreen.css';

export function RoomsScreen() {
  const { rooms, loading, addRoom } = useRooms();
  const { tasks } = useTasks();
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleAddRoom = async () => {
    if (!newRoomName.trim()) return;
    await addRoom({
      name: newRoomName,
      emoji: '📦',
      color: '#5F7A8E',
    });
    setNewRoomName('');
    setIsAddingRoom(false);
  };

  if (loading) return <div className="screen-loading">Loading...</div>;

  return (
    <div className="screen rooms-screen">
      <header className="screen-header">
        <h1>Rooms</h1>
        <Button onClick={() => setIsAddingRoom(true)}>+ Add Room</Button>
      </header>

      {rooms.length === 0 ? (
        <div className="empty-state">
          <h2>No rooms yet.</h2>
          <p>Create your first focus space.</p>
          <Button onClick={() => setIsAddingRoom(true)}>+ Add Room</Button>
        </div>
      ) : (
        <div className="rooms-list">
          {rooms.map((room) => {
            const roomTasks = tasks.filter((t) => t.roomId === room.id);
            return (
              <Card key={room.id} borderColor={room.color}>
                <div className="room-header">
                  <span className="room-icon">{room.emoji}</span>
                  <h3>{room.name}</h3>
                </div>
                <p className="room-task-count">{roomTasks.length} tasks</p>
              </Card>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isAddingRoom}
        onClose={() => setIsAddingRoom(false)}
        title="Add Room"
      >
        <div className="room-form">
          <input
            type="text"
            placeholder="Room name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
            className="form-input"
          />
          <Button onClick={handleAddRoom} fullWidth>
            Create Room
          </Button>
        </div>
      </Modal>
    </div>
  );
}
