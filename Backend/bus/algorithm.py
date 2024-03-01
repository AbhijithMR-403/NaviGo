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


connections = [
    (1, 2),
    (1, 3),
    (2, 5),
    (5, 9),
    (3, 4),
    (4, 8),
    (7, 6),
    (6, 9),
    (8, 7),
    (8, 9),
]

# Construct graph representation
graph = {}
for src, dst in connections:
    if src not in graph:
        graph[src] = []
    graph[src].append(dst)
print(graph)


print('\n\n\n')
print(find_all_paths(graph, 1, 9))
