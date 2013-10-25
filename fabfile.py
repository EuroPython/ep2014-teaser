from fabric.api import run, local, cd, env, task, sudo, put


env.hosts = ['pyep00.gocept.net']

@task
def deploy():
    local('grunt dist')
    local('tar -cjvf dist.tar.bz2 dist')
    put("dist.tar.bz2", env.tmp_dir)
    with cd(env.tmp_dir):
        run('tar -xjvf dist.tar.bz2')
    with cd(env.www_root):
        sudo('rsync -av --delete {0}/dist/* ./'.format(env.tmp_dir),
            user=env.srv_user)
