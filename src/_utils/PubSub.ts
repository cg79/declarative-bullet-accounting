type Callback = (...args: any[]) => void;

class PubSub {
  private events: { [key: string]: Callback[] } = {};

  // Subscribe to an event
  public subscribe(event: string, callback: Callback): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  // Unsubscribe from an event
  public unsubscribe(event: string, callback: Callback): void {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((cb) => cb !== callback);
  }

  // Publish an event
  public publish(event: string, ...args: any[]): void {
    if (!this.events[event]) return;

    this.events[event].forEach((callback) => {
      callback(...args);
    });
  }
}

const instance = new PubSub();
export default instance;
