from pynvml import *

def get_gpu_metrics():
    nvmlInit()
    handle = nvmlDeviceGetHandleByIndex(0)

    utilization = nvmlDeviceGetUtilizationRates(handle)
    memory_info = nvmlDeviceGetMemoryInfo(handle)
    temperature = nvmlDeviceGetTemperature(handle, NVML_TEMPERATURE_GPU)
    power_draw = nvmlDeviceGetPowerUsage(handle) / 1000
    power_limit = nvmlDeviceGetPowerManagementLimit(handle) / 1000
    processes = nvmlDeviceGetComputeRunningProcesses(handle)

    process_list = []
    for p in processes:
        try:
            process_name = nvmlSystemGetProcessName(p.pid)
        except NVMLError:
            process_name = "Sin permisos"
        memory_used = p.usedGpuMemory / 1e6 if p.usedGpuMemory is not None else 0
        process_list.append({"PID": p.pid, "Nombre": process_name, "Memoria Usada (MB)": memory_used})

    return {
        "gpu_usage": utilization.gpu,
        "memory_used": memory_info.used / 1e6,
        "memory_total": memory_info.total / 1e6,
        "temperature": temperature,
        "power_draw": power_draw,
        "power_limit": power_limit,
        "processes": process_list
    }
