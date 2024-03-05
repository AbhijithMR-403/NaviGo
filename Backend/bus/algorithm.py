from .models import ConnectedRoute


def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return [path]
    if start not in graph:
        return []
    paths = []
    for neighbor in graph[start]:
        if neighbor not in path:
            new_paths = find_all_paths(graph, neighbor, end, path)
            for new_path in new_paths:
                paths.append(new_path)
    return paths


def algorithmAllPaths(start, end):
    connections = []
    for Route in ConnectedRoute.objects.all():
        connections.append((Route.bus_stop_1.id, Route.bus_stop_2.id))

    # Construct graph representation
    graph = {}
    for src, dst in connections:
        if src not in graph:
            graph[src] = []
        graph[src].append(dst)
    print(graph)

    print('\n\n\n')
    print(find_all_paths(graph, start, end))
    return find_all_paths(graph, int(start), int(end))
