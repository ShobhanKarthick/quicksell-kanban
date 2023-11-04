import { FaSignal } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { FcHighPriority } from "react-icons/fc";
import { MdSignalCellularAlt, MdSignalCellularAlt2Bar } from "react-icons/md";
import React from "react";
import { RxAvatar } from "react-icons/rx";
import { BsCircle } from "react-icons/bs";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { AiFillExclamationCircle } from "react-icons/ai";

export interface Ticket {
  id: string;
  title: string;
  tag: string[];
  userId: string;
  status: string;
  priority: number;
}

export interface User {
  id: string;
  name: string;
  available: boolean;
}

export interface Data {
  tickets: Ticket[];
  users: User[];
}

export interface GroupedData {
  key: string;
  icon?: any;
  tickets: Ticket[];
}

export const groupByStatus = (data: Data): GroupedData[] => {
  const groupedData: GroupedData[] = [];
  const statusSet = new Set<string>();

  data.tickets.forEach((ticket) => {
    statusSet.add(ticket.status);
  });

  console.log(statusSet);

  const statusMap: { [key: string]: React.ComponentType } = {
    Todo: BsCircle,
    "In Progress": FaCircleHalfStroke,
    Backlog: AiFillExclamationCircle,
  };

  statusSet.forEach((status) => {
    const group: GroupedData = {
      key: status,
      icon: statusMap[status],
      tickets: data.tickets
        .filter((ticket) => ticket.status === status)
        .map((ticket) => ({
          ...ticket,
          user: data.users.find((user) => user.id === ticket.userId),
        })),
    };
    groupedData.push(group);
  });

  return groupedData;
};

export const groupByUser = (data: Data): GroupedData[] => {
  const groupedData: GroupedData[] = [];
  const userSet = new Set<string>();

  data.tickets.forEach((ticket) => {
    userSet.add(ticket.userId);
  });

  userSet.forEach((userId) => {
    const user = data.users.find((user) => user.id === userId);
    const group: GroupedData = {
      key: user ? user.name : "Unknown User",
      icon: RxAvatar,
      tickets: data.tickets.filter((ticket) => ticket.userId === userId),
    };
    groupedData.push(group);
  });

  return groupedData;
};

export const groupByPriority = (data: Data): GroupedData[] => {
  const groupedData: GroupedData[] = [];
  const prioritySet = new Set<number>();

  const priorityKeyMap: {
    [key: number]: { name: string; icon: React.ComponentType };
  } = {
    4: { name: "Urgent", icon: FcHighPriority },
    3: { name: "High", icon: FaSignal },
    2: { name: "Medium", icon: MdSignalCellularAlt },
    1: { name: "Low", icon: MdSignalCellularAlt2Bar },
    0: { name: "No priority", icon: BiDotsHorizontalRounded },
  };

  data.tickets.forEach((ticket) => {
    prioritySet.add(ticket.priority);
  });

  const sortedPriorities = Array.from(prioritySet).sort((a, b) => a - b);

  sortedPriorities.forEach((priority) => {
    const group: GroupedData = {
      key: priorityKeyMap[priority]["name"],
      icon: priorityKeyMap[priority]["icon"],
      tickets: data.tickets
        .filter((ticket) => ticket.priority === priority)
        .map((ticket) => ({
          ...ticket,
          user: data.users.find((user) => user.id === ticket.userId),
        })),
    };
    groupedData.push(group);
  });

  return groupedData;
};

export const sortTicketsByPriority = (data: GroupedData[]): GroupedData[] => {
  data.forEach((group) => {
    group.tickets = [...group.tickets].sort((a, b) => b.priority - a.priority);
  });

  return data;
};

export const sortTicketsByTitle = (data: GroupedData[]): GroupedData[] => {
  data.forEach((group) => {
    group.tickets = [...group.tickets].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  });

  return data;
};
